import { getDb } from "./db";
import { queryAll, queryOne } from "./db-query";
import type { Review, ReviewSummary } from "@/types";

export function getReviewsByProductId(productId: number): Review[] {
  const db = getDb();
  return queryAll<Review>(
    db,
    `SELECT r.*, u.name as user_name
     FROM reviews r
     JOIN users u ON r.user_id = u.id
     WHERE r.product_id = ?
     ORDER BY r.created_at DESC`,
    productId
  );
}

export function getReviewSummary(productId: number): ReviewSummary {
  const db = getDb();
  const row = queryOne<{ avg_rating: number | null; total: number }>(
    db,
    `SELECT AVG(rating) as avg_rating, COUNT(*) as total
     FROM reviews WHERE product_id = ?`,
    productId
  );

  return {
    averageRating: row?.avg_rating ? Math.round(row.avg_rating * 10) / 10 : 0,
    totalReviews: row?.total ?? 0,
  };
}

export function getUserReviewForProduct(
  productId: number,
  userId: number
): Review | null {
  const db = getDb();
  return queryOne<Review>(
    db,
    "SELECT * FROM reviews WHERE product_id = ? AND user_id = ?",
    productId,
    userId
  );
}

export function createReview(
  productId: number,
  userId: number,
  rating: number,
  comment: string
): Review {
  const db = getDb();
  const result = db
    .prepare(
      "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)"
    )
    .run(productId, userId, rating, comment);

  const review = queryOne<Review>(
    db,
    `SELECT r.*, u.name as user_name
     FROM reviews r
     JOIN users u ON r.user_id = u.id
     WHERE r.id = ?`,
    Number(result.lastInsertRowid)
  );

  if (!review) {
    throw new Error("Yorum oluşturulamadı");
  }
  return review;
}
