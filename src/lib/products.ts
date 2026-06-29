import { getDb } from "./db";
import { queryAll, queryOne } from "./db-query";
import type { Category, Product, ProductFilters } from "@/types";

function buildWhereClause(filters: ProductFilters): {
  where: string;
  params: (string | number)[];
} {
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (filters.search) {
    conditions.push("(p.name LIKE ? OR p.description LIKE ?)");
    const term = `%${filters.search}%`;
    params.push(term, term);
  }

  if (filters.categorySlug) {
    conditions.push("c.slug = ?");
    params.push(filters.categorySlug);
  }

  if (filters.minPrice !== undefined) {
    conditions.push("p.price >= ?");
    params.push(filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    conditions.push("p.price <= ?");
    params.push(filters.maxPrice);
  }

  if (filters.featured) {
    conditions.push("p.is_featured = 1");
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  return { where, params };
}

function buildOrderClause(sort?: ProductFilters["sort"]): string {
  switch (sort) {
    case "price_asc":
      return "ORDER BY p.price ASC";
    case "price_desc":
      return "ORDER BY p.price DESC";
    case "name":
      return "ORDER BY p.name ASC";
    case "newest":
    default:
      return "ORDER BY p.created_at DESC";
  }
}

const baseSelect = `
  SELECT p.*, c.name as category_name, c.slug as category_slug
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
`;

export function getProducts(filters: ProductFilters = {}): Product[] {
  const db = getDb();
  const { where, params } = buildWhereClause(filters);
  const order = buildOrderClause(filters.sort);

  return queryAll<Product>(db, `${baseSelect} ${where} ${order}`, ...params);
}

export function getProductById(id: number): Product | null {
  const db = getDb();
  return queryOne<Product>(db, `${baseSelect} WHERE p.id = ?`, id);
}

export function getFeaturedProducts(limit = 6): Product[] {
  const db = getDb();
  return queryAll<Product>(
    db,
    `${baseSelect} WHERE p.is_featured = 1 ORDER BY p.created_at DESC LIMIT ?`,
    limit
  );
}

export function getCategories(): Category[] {
  const db = getDb();
  return queryAll<Category>(
    db,
    "SELECT * FROM categories ORDER BY name ASC"
  );
}

export function getCategoryBySlug(slug: string): Category | null {
  const db = getDb();
  return queryOne<Category>(
    db,
    "SELECT * FROM categories WHERE slug = ?",
    slug
  );
}

export function updateProductStock(
  productId: number,
  quantity: number
): void {
  const db = getDb();
  db.prepare(
    "UPDATE products SET stock = stock - ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND stock >= ?"
  ).run(quantity, productId, quantity);
}
