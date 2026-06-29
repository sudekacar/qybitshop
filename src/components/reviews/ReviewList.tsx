import { formatDate } from "@/lib/format";
import type { Review, ReviewSummary } from "@/types";
import { StarRating } from "./StarRating";

interface ReviewListProps {
  reviews: Review[];
  summary: ReviewSummary;
  emptyMessage: string;
  averageLabel: string;
  countLabel: string;
}

export function ReviewList({
  reviews,
  summary,
  emptyMessage,
  averageLabel,
  countLabel,
}: ReviewListProps) {
  return (
    <div>
      {summary.totalReviews > 0 && (
        <div className="mb-6 flex items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {summary.averageRating}
          </div>
          <div>
            <StarRating rating={summary.averageRating} />
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {averageLabel} · {countLabel}
            </p>
          </div>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{emptyMessage}</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {review.user_name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {formatDate(review.created_at)}
                  </p>
                </div>
                <StarRating rating={review.rating} size="sm" />
              </div>
              {review.comment && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {review.comment}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
