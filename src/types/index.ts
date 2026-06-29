export type UserRole = "user" | "admin";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "credit_card" | "debit_card";

export type ProductSort = "price_asc" | "price_desc" | "newest" | "name";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface UserWithPassword extends User {
  password_hash: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  category_id: number;
  is_featured: number;
  created_at: string;
  updated_at: string;
  category_name?: string;
  category_slug?: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  total_amount: number;
  status: OrderStatus;
  shipping_name: string;
  shipping_address: string;
  shipping_phone: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  product_name?: string;
  product_image?: string | null;
}

export interface ProductFilters {
  search?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
  featured?: boolean;
}

export interface SessionData {
  userId?: number;
  email?: string;
  name?: string;
  isLoggedIn: boolean;
}

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  user_name?: string;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
}
