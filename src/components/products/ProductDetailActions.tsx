"use client";

import { useState } from "react";
import { useTranslations } from "@/context/LocaleProvider";
import { AddToCartButton } from "./AddToCartButton";
import type { Product } from "@/types";

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { t } = useTranslations();
  const [quantity, setQuantity] = useState(1);
  const inStock = product.stock > 0;
  const maxQuantity = Math.min(product.stock, 10);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t("products.detail.quantity")}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            −
          </button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            disabled={quantity >= maxQuantity}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            +
          </button>
        </div>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {inStock
            ? t("products.inStock", { count: product.stock })
            : t("products.noStock")}
        </span>
      </div>

      <AddToCartButton
        productId={product.id}
        quantity={quantity}
        disabled={!inStock}
      />
    </div>
  );
}
