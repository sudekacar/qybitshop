"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartProvider";
import { formatPrice, formatDate } from "@/lib/format";
import type { Order } from "@/types";

interface OrderSuccessClientProps {
  order: Order;
}

export function OrderSuccessClient({ order }: OrderSuccessClientProps) {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
        ✓
      </div>
      <h1 className="mt-6 text-2xl font-bold text-zinc-900">
        Siparişiniz Alındı!
      </h1>
      <p className="mt-2 text-zinc-600">
        Sipariş numaranız:{" "}
        <span className="font-semibold text-blue-600">
          {order.order_number}
        </span>
      </p>
      <p className="mt-1 text-sm text-zinc-500">
        {formatDate(order.created_at)}
      </p>

      <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 text-left shadow-sm">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-zinc-500">Toplam Tutar</dt>
            <dd className="font-semibold">{formatPrice(order.total_amount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500">Teslimat Adresi</dt>
            <dd className="max-w-[200px] text-right">{order.shipping_address}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500">Durum</dt>
            <dd className="font-medium text-green-600">Hazırlanıyor</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href={`/orders/${order.id}`}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Sipariş Detayı
        </Link>
        <Link
          href="/products"
          className="rounded-lg border border-zinc-300 px-6 py-3 font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Alışverişe Devam
        </Link>
      </div>
    </div>
  );
}
