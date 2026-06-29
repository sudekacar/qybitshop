"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

interface CartItemRowProps {
  product: Product;
  quantity: number;
}

export function CartItemRow({ product, quantity }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4">
      <Link
        href={`/products/${product.id}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100"
      >
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col">
        <Link
          href={`/products/${product.id}`}
          className="font-semibold text-zinc-900 hover:text-blue-600"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-zinc-500">{formatPrice(product.price)}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 hover:bg-zinc-50"
              aria-label="Azalt"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.stock}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 hover:bg-zinc-50 disabled:opacity-50"
              aria-label="Artır"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-zinc-900">
              {formatPrice(product.price * quantity)}
            </span>
            <button
              type="button"
              onClick={() => removeItem(product.id)}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Kaldır
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
