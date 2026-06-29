"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSession } from "@/lib/session";
import {
  createReview,
  getUserReviewForProduct,
} from "@/lib/reviews";

const reviewSchema = z.object({
  productId: z.coerce.number().int().positive(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(3, "Yorum en az 3 karakter olmalıdır").max(1000),
});

export type ReviewState = {
  error?: string;
  success?: boolean;
};

export async function submitReviewAction(
  _prevState: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    return { error: "loginRequired" };
  }

  const parsed = reviewSchema.safeParse({
    productId: formData.get("productId"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form" };
  }

  const { productId, rating, comment } = parsed.data;

  const existing = getUserReviewForProduct(productId, session.userId);
  if (existing) {
    return { error: "alreadyReviewed" };
  }

  try {
    createReview(productId, session.userId, rating, comment);
    revalidatePath(`/products/${productId}`);
    return { success: true };
  } catch {
    return { error: "error" };
  }
}
