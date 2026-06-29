import { Suspense } from "react";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SearchBar } from "@/components/products/SearchBar";
import { getServerTranslations } from "@/lib/locale-server";
import { getCategories, getProducts } from "@/lib/products";
import { buildProductFilters } from "@/lib/validators";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { t } = await getServerTranslations();
  const params = await searchParams;
  const categories = getCategories();
  const filters = buildProductFilters(params);
  const products = getProducts(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {t("products.title")}
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          {t("products.listing", { count: products.length })}
        </p>
      </div>

      <div className="mb-6">
        <Suspense
          fallback={
            <div className="h-12 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          }
        >
          <SearchBar />
        </Suspense>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <Suspense
          fallback={
            <div className="h-64 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          }
        >
          <ProductFilters categories={categories} />
        </Suspense>
        <div className="lg:col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
