import { CartPageClient } from "@/components/cart/CartPageClient";
import { getServerTranslations } from "@/lib/locale-server";

export default async function CartPage() {
  const { t } = await getServerTranslations();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {t("cart.title")}
      </h1>
      <CartPageClient />
    </div>
  );
}
