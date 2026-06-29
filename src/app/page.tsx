import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCategories, getFeaturedProducts } from "@/lib/products";
import { getServerTranslations } from "@/lib/locale-server";

export default async function HomePage() {
  const { t } = await getServerTranslations();
  const featuredProducts = getFeaturedProducts(8);
  const categories = getCategories();

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-blue-300">
              {t("home.tagline")}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {t("home.title")}
            </h1>
            <p className="mt-4 text-lg text-blue-100">{t("home.subtitle")}</p>
            <Link
              href="/products"
              className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 transition hover:bg-blue-50"
            >
              {t("home.cta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {t("home.categories")}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-600"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {category.name}
              </h3>
              <p className="mt-1 text-xs text-zinc-500 line-clamp-2 dark:text-zinc-400">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {t("home.featured")}
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            {t("home.viewAll")}
          </Link>
        </div>
        <div className="mt-6">
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </div>
  );
}
