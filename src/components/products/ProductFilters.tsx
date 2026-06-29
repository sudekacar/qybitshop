"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { useTranslations } from "@/context/LocaleProvider";
import type { Category } from "@/types";

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslations();

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.push(`/products?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  return (
    <aside className="space-y-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {t("products.filters.category")}
        </h2>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => updateParams("category", "")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
              !searchParams.get("category")
                ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {t("products.filters.all")}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => updateParams("category", category.slug)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                searchParams.get("category") === category.slug
                  ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {t("products.filters.priceRange")}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder={t("products.filters.min")}
            defaultValue={searchParams.get("minPrice") ?? ""}
            onChange={(e) => updateParams("minPrice", e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <input
            type="number"
            placeholder={t("products.filters.max")}
            defaultValue={searchParams.get("maxPrice") ?? ""}
            onChange={(e) => updateParams("maxPrice", e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {t("products.filters.sort")}
        </h2>
        <select
          value={searchParams.get("sort") ?? "newest"}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="newest">{t("products.filters.sortNewest")}</option>
          <option value="price_asc">{t("products.filters.sortPriceAsc")}</option>
          <option value="price_desc">{t("products.filters.sortPriceDesc")}</option>
          <option value="name">{t("products.filters.sortName")}</option>
        </select>
      </div>

      {isPending && (
        <p className="text-xs text-blue-600 dark:text-blue-400">
          {t("products.filters.applying")}
        </p>
      )}
    </aside>
  );
}
