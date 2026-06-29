"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { useTranslations } from "@/context/LocaleProvider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import { AddToCartButton } from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

function ProductCardComponent({ product }: ProductCardProps) {
  const { t } = useTranslations();
  const inStock = product.stock > 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            {t("products.noImage")}
          </div>
        )}
        {!inStock && (
          <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">
            {t("products.outOfStock")}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {product.category_name && (
          <span className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {product.category_name}
          </span>
        )}
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 font-semibold text-zinc-900 transition group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {formatPrice(product.price)}
        </p>
        <div className="mt-auto pt-4">
          <AddToCartButton productId={product.id} disabled={!inStock} compact />
        </div>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);
