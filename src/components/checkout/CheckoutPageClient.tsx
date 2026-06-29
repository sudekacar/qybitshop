"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { toCartLineItems } from "@/lib/type-guards";
import { parseProductsResponse } from "@/lib/validators";
import type { Product } from "@/types";

export function CheckoutPageClient() {
  const { items, isHydrated } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const productIds = useMemo(
    () => items.map((item) => item.productId).join(","),
    [items]
  );

  useEffect(() => {
    if (!isHydrated || items.length === 0) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?ids=${productIds}`);
        if (!response.ok) {
          setProducts([]);
          return;
        }
        const data: unknown = await response.json();
        setProducts(parseProductsResponse(data));
      } finally {
        setLoading(false);
      }
    };

    void fetchProducts();
  }, [isHydrated, items.length, productIds]);

  const cartWithProducts = useMemo(
    () => toCartLineItems(items, products),
    [items, products]
  );

  const subtotal = cartWithProducts.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  const cartData = JSON.stringify(items);

  if (!isHydrated || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-zinc-500">Yükleniyor...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-16 text-center">
        <p className="text-lg font-medium text-zinc-600">Sepetiniz boş</p>
        <Link
          href="/cart"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Sepete dön
        </Link>
      </div>
    );
  }

  return (
    <CheckoutForm
      cartItems={cartWithProducts}
      subtotal={subtotal}
      cartData={cartData}
    />
  );
}
