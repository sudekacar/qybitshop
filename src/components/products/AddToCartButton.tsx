"use client";

import { useState } from "react";
import { useCart } from "@/context/CartProvider";
import { useTranslations } from "@/context/LocaleProvider";

interface AddToCartButtonProps {
  productId: number;
  disabled?: boolean;
  compact?: boolean;
  quantity?: number;
}

export function AddToCartButton({
  productId,
  disabled = false,
  compact = false,
  quantity = 1,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { t } = useTranslations();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(productId, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`w-full rounded-lg font-medium transition ${
        compact ? "px-3 py-2 text-sm" : "px-4 py-3 text-base"
      } ${
        disabled
          ? "cursor-not-allowed bg-zinc-200 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500"
          : added
            ? "bg-green-600 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {disabled
        ? t("products.noStock")
        : added
          ? t("products.added")
          : t("products.addToCart")}
    </button>
  );
}
