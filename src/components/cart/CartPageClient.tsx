"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { useTranslations } from "@/context/LocaleProvider";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { toCartLineItems } from "@/lib/type-guards";
import { parseProductsResponse } from "@/lib/validators";
import type { Product } from "@/types";

export function CartPageClient() {
  const { items, isHydrated, itemCount } = useCart();
  const { t } = useTranslations();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const productIds = useMemo(
    () => items.map((item) => item.productId).join(","),
    [items]
  );

  useEffect(() => {
    if (!isHydrated || items.length === 0) {
      setProducts([]);
      return;
    }

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
      } catch {
        setProducts([]);
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

  if (!isHydrated || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-zinc-500">{t("cart.loading")}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
        <p className="text-lg font-medium text-zinc-600 dark:text-zinc-300">
          {t("cart.empty")}
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          {t("cart.browse")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {cartWithProducts.map(({ product, quantity }) => (
          <CartItemRow key={product.id} product={product} quantity={quantity} />
        ))}
      </div>
      <div>
        <CartSummary subtotal={subtotal} itemCount={itemCount} />
      </div>
    </div>
  );
}
