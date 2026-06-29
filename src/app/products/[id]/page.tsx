import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailActions } from "@/components/products/ProductDetailActions";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { StarRating } from "@/components/reviews/StarRating";
import { formatPrice } from "@/lib/format";
import { getServerTranslations } from "@/lib/locale-server";
import { getProductById } from "@/lib/products";
import { getReviewSummary } from "@/lib/reviews";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { t } = await getServerTranslations();
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (Number.isNaN(productId)) {
    notFound();
  }

  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  const inStock = product.stock > 0;
  const reviewSummary = getReviewSummary(productId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          {t("products.breadcrumbHome")}
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-blue-600 dark:hover:text-blue-400">
          {t("products.breadcrumbProducts")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-400">
              {t("products.noImage")}
            </div>
          )}
        </div>

        <div>
          {product.category_name && (
            <Link
              href={`/products?category=${product.category_slug}`}
              className="text-sm font-medium uppercase tracking-wide text-blue-600 hover:underline dark:text-blue-400"
            >
              {product.category_name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {product.name}
          </h1>

          {reviewSummary.totalReviews > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={reviewSummary.averageRating} size="sm" />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {reviewSummary.averageRating} ·{" "}
                {t("reviews.count", { count: reviewSummary.totalReviews })}
              </span>
            </div>
          )}

          <p className="mt-4 text-3xl font-bold text-blue-600 dark:text-blue-400">
            {formatPrice(product.price)}
          </p>

          <div className="mt-4">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                inStock
                  ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
              }`}
            >
              {inStock
                ? t("products.inStock", { count: product.stock })
                : t("products.noStock")}
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-300">
            {product.description}
          </p>

          <ProductDetailActions product={product} />
        </div>
      </div>

      <ProductReviews productId={productId} />
    </div>
  );
}
