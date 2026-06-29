"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { createOrder, type CreateOrderItemInput } from "@/lib/orders";
import { getProductById } from "@/lib/products";
import { parseCartItems } from "@/lib/validators";

const checkoutSchema = z.object({
  shippingName: z.string().min(2, "Ad gereklidir"),
  shippingAddress: z.string().min(10, "Adres en az 10 karakter olmalıdır"),
  shippingPhone: z
    .string()
    .min(10, "Geçerli bir telefon numarası giriniz"),
  paymentMethod: z.enum(["credit_card", "debit_card"]),
  cardNumber: z.string().min(16, "Kart numarası 16 haneli olmalıdır"),
  cardExpiry: z.string().min(5, "Son kullanma tarihi gereklidir"),
  cardCvv: z.string().min(3, "CVV gereklidir"),
  cartData: z.string(),
});

export type CheckoutState = {
  error?: string;
  orderId?: number;
};

export async function checkoutAction(
  _prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    return { error: "Sipariş vermek için giriş yapmalısınız" };
  }

  const parsed = checkoutSchema.safeParse({
    shippingName: formData.get("shippingName"),
    shippingAddress: formData.get("shippingAddress"),
    shippingPhone: formData.get("shippingPhone"),
    paymentMethod: formData.get("paymentMethod"),
    cardNumber: formData.get("cardNumber"),
    cardExpiry: formData.get("cardExpiry"),
    cardCvv: formData.get("cardCvv"),
    cartData: formData.get("cartData"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form" };
  }

  const { shippingName, shippingAddress, shippingPhone, paymentMethod } =
    parsed.data;

  const cartItems = parseCartItems(parsed.data.cartData);
  if (!cartItems) {
    return { error: "Sepet verisi geçersiz" };
  }

  if (!cartItems.length) {
    return { error: "Sepetiniz boş" };
  }

  const orderItems: CreateOrderItemInput[] = [];

  for (const item of cartItems) {
    const product = getProductById(item.productId);
    if (!product) {
      return { error: `Ürün bulunamadı (ID: ${item.productId})` };
    }
    if (product.stock < item.quantity) {
      return { error: `${product.name} için yeterli stok yok` };
    }
    orderItems.push({
      productId: product.id,
      quantity: item.quantity,
      unitPrice: product.price,
    });
  }

  let order;
  try {
    order = createOrder({
      userId: session.userId,
      items: orderItems,
      shippingName,
      shippingAddress,
      shippingPhone,
      paymentMethod,
    });
  } catch {
    return { error: "Sipariş oluşturulurken bir hata oluştu" };
  }

  redirect(`/checkout/success?orderId=${order.id}`);
}
