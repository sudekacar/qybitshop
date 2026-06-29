import Link from "next/link";
import { getServerTranslations } from "@/lib/locale-server";

export default async function ProductNotFound() {
  const { t } = await getServerTranslations();

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {t("products.detail.notFoundTitle")}
      </h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">
        {t("products.detail.notFoundDesc")}
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        {t("products.detail.backToProducts")}
      </Link>
    </div>
  );
}
