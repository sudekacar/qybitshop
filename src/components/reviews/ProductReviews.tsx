import { getSession } from "@/lib/session";
import {
  getReviewSummary,
  getReviewsByProductId,
  getUserReviewForProduct,
} from "@/lib/reviews";
import { getServerTranslations } from "@/lib/locale-server";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";

interface ProductReviewsProps {
  productId: number;
}

export async function ProductReviews({ productId }: ProductReviewsProps) {
  const session = await getSession();
  const { t } = await getServerTranslations();
  const reviews = getReviewsByProductId(productId);
  const summary = getReviewSummary(productId);
  const userReview =
    session.userId && session.isLoggedIn
      ? getUserReviewForProduct(productId, session.userId)
      : null;

  return (
    <section className="mt-12 border-t border-zinc-200 pt-10 dark:border-zinc-700">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {t("reviews.title")}
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <ReviewList
            reviews={reviews}
            summary={summary}
            emptyMessage={t("reviews.noReviews")}
            averageLabel={t("reviews.average")}
            countLabel={t("reviews.count", { count: summary.totalReviews })}
          />
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {t("reviews.submit")}
          </h3>
          <ReviewForm
            productId={productId}
            isLoggedIn={session.isLoggedIn}
            hasReviewed={!!userReview}
          />
        </div>
      </div>
    </section>
  );
}
