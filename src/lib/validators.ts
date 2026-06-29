import { z } from "zod";
import type { CartItem, Product, ProductFilters } from "@/types";

export const productSortSchema = z.enum([
  "price_asc",
  "price_desc",
  "newest",
  "name",
]);

export type ProductSort = z.infer<typeof productSortSchema>;

export function parseProductSort(value: string | undefined): ProductSort {
  const result = productSortSchema.safeParse(value);
  return result.success ? result.data : "newest";
}

export const cartItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export const cartItemsSchema = z.array(cartItemSchema);

export function parseCartItems(json: string): CartItem[] | null {
  try {
    const parsed: unknown = JSON.parse(json);
    const result = cartItemsSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function parseCartItemsFromUnknown(data: unknown): CartItem[] {
  const result = cartItemsSchema.safeParse(data);
  return result.success ? result.data : [];
}

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  stock: z.number(),
  image_url: z.string().nullable(),
  category_id: z.number(),
  is_featured: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  category_name: z.string().optional(),
  category_slug: z.string().optional(),
});

export const productsResponseSchema = z.array(productSchema);

export function parseProductsResponse(data: unknown): Product[] {
  const result = productsResponseSchema.safeParse(data);
  return result.success ? result.data : [];
}

export function getFormString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

export function getRedirectPath(value: FormDataEntryValue | null): string {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/";
}

export function parseOptionalFloat(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function buildProductFilters(params: {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}): ProductFilters {
  return {
    search: params.search,
    categorySlug: params.category,
    minPrice: parseOptionalFloat(params.minPrice),
    maxPrice: parseOptionalFloat(params.maxPrice),
    sort: parseProductSort(params.sort),
  };
}
