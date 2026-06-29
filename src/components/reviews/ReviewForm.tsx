"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitReviewAction, type ReviewState } from "@/actions/reviews";
import { useTranslations } from "@/context/LocaleProvider";
import { StarRating } from "./StarRating";

const initialState: ReviewState = {};

interface ReviewFormProps {
  productId: number;
  isLoggedIn: boolean;
  hasReviewed: boolean;
}

export function ReviewForm({
  productId,
  isLoggedIn,
  hasReviewed,
}: ReviewFormProps) {
  const { t } = useTranslations();
  const [rating, setRating] = useState(5);
  const [state, formAction, isPending] = useActionState(
    submitReviewAction,
    initialState
  );

  if (!isLoggedIn) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {t("reviews.loginRequired")}{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          {t("nav.login")}
        </Link>
      </p>
    );
  }

  if (hasReviewed || state.success) {
    return (
      <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
        {state.success ? t("reviews.success") : t("reviews.alreadyReviewed")}
      </p>
    );
  }

  const errorMessage =
    state.error === "loginRequired"
      ? t("reviews.loginRequired")
      : state.error === "alreadyReviewed"
        ? t("reviews.alreadyReviewed")
        : state.error === "error"
          ? t("reviews.error")
          : state.error;

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="rating" value={rating} />

      {errorMessage && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t("reviews.yourRating")}
        </label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`text-2xl transition ${
                  value <= rating
                    ? "text-amber-400"
                    : "text-zinc-300 dark:text-zinc-600"
                }`}
                aria-label={`${value}`}
              >
                ★
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="comment"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {t("reviews.comment")}
        </label>
        <textarea
          id="comment"
          name="comment"
          required
          rows={4}
          maxLength={1000}
          placeholder={t("reviews.commentPlaceholder")}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? t("reviews.submitting") : t("reviews.submit")}
      </button>
    </form>
  );
}
