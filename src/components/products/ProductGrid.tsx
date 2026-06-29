"use client";

import { useTranslations } from "@/context/LocaleProvider";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { t } = useTranslations();

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
        <p className="text-lg font-medium text-zinc-600 dark:text-zinc-300">
          {t("products.notFound")}
        </p>
        <p className="mt-1 text-sm text-zinc-400">{t("products.notFoundHint")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
