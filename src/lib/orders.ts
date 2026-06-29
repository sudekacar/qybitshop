import { getDb } from "./db";
import { queryAll, queryOne } from "./db-query";
import type { Order, OrderItem, PaymentMethod } from "@/types";

export interface CreateOrderItemInput {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderInput {
  userId: number;
  items: CreateOrderItemInput[];
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  paymentMethod: PaymentMethod;
}

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `ORD-${year}-${random}`;
}

export function createOrder(input: CreateOrderInput): Order {
  const db = getDb();
  const totalAmount = input.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const createOrderTransaction = db.transaction(() => {
    let orderNumber = generateOrderNumber();
    let attempts = 0;

    while (attempts < 5) {
      const existing = queryOne<{ id: number }>(
        db,
        "SELECT id FROM orders WHERE order_number = ?",
        orderNumber
      );
      if (!existing) break;
      orderNumber = generateOrderNumber();
      attempts++;
    }

    const orderResult = db
      .prepare(
        `INSERT INTO orders (user_id, order_number, total_amount, status, shipping_name, shipping_address, shipping_phone, payment_method)
         VALUES (?, ?, ?, 'processing', ?, ?, ?, ?)`
      )
      .run(
        input.userId,
        orderNumber,
        totalAmount,
        input.shippingName,
        input.shippingAddress,
        input.shippingPhone,
        input.paymentMethod
      );

    const orderId = Number(orderResult.lastInsertRowid);
    const insertItem = db.prepare(
      "INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)"
    );
    const updateStock = db.prepare(
      "UPDATE products SET stock = stock - ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    );

    for (const item of input.items) {
      insertItem.run(orderId, item.productId, item.quantity, item.unitPrice);
      updateStock.run(item.quantity, item.productId);
    }

    return orderId;
  });

  const orderId = createOrderTransaction();
  const order = getOrderById(orderId);
  if (!order) {
    throw new Error("Sipariş oluşturulamadı");
  }
  return order;
}

export function getOrdersByUserId(userId: number): Order[] {
  const db = getDb();
  return queryAll<Order>(
    db,
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    userId
  );
}

export function getOrderById(orderId: number): Order | null {
  const db = getDb();
  return queryOne<Order>(db, "SELECT * FROM orders WHERE id = ?", orderId);
}

export function getOrderByIdForUser(
  orderId: number,
  userId: number
): Order | null {
  const db = getDb();
  return queryOne<Order>(
    db,
    "SELECT * FROM orders WHERE id = ? AND user_id = ?",
    orderId,
    userId
  );
}

export function getOrderItems(orderId: number): OrderItem[] {
  const db = getDb();
  return queryAll<OrderItem>(
    db,
    `SELECT oi.*, p.name as product_name, p.image_url as product_image
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    orderId
  );
}
