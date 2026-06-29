"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { useTranslations } from "@/context/LocaleProvider";

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
  showCheckoutButton?: boolean;
}

export function CartSummary({
  subtotal,
  itemCount,
  showCheckoutButton = true,
}: CartSummaryProps) {
  const { t } = useTranslations();

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {t("cart.summary")}
      </h2>

      <dl className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <dt className="text-zinc-500 dark:text-zinc-400">{t("cart.itemCount")}</dt>
          <dd className="font-medium text-zinc-900 dark:text-zinc-100">{itemCount}</dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-zinc-500 dark:text-zinc-400">{t("cart.subtotal")}</dt>
          <dd className="font-medium text-zinc-900 dark:text-zinc-100">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-zinc-500 dark:text-zinc-400">{t("cart.shipping")}</dt>
          <dd className="font-medium text-green-600 dark:text-green-400">
            {t("cart.freeShipping")}
          </dd>
        </div>
        <div className="border-t border-zinc-200 pt-3 dark:border-zinc-700">
          <div className="flex justify-between">
            <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
              {t("cart.total")}
            </dt>
            <dd className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(subtotal)}
            </dd>
          </div>
        </div>
      </dl>

      {showCheckoutButton && itemCount > 0 && (
        <Link
          href="/checkout"
          className="mt-6 block w-full rounded-lg bg-blue-600 py-3 text-center font-medium text-white transition hover:bg-blue-700"
        >
          {t("cart.checkout")}
        </Link>
      )}
    </div>
  );
}
