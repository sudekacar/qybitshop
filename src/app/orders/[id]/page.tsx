import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  formatDate,
  formatPrice,
  ORDER_STATUS_LABELS,
} from "@/lib/format";
import { getOrderByIdForUser, getOrderItems } from "@/lib/orders";
import { getSession } from "@/lib/session";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    redirect("/login");
  }

  const { id } = await params;
  const orderId = parseInt(id, 10);

  if (Number.isNaN(orderId)) {
    notFound();
  }

  const order = getOrderByIdForUser(orderId, session.userId);
  if (!order) {
    notFound();
  }

  const items = getOrderItems(orderId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-zinc-500">
        <Link href="/orders" className="hover:text-blue-600">
          Siparişlerim
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900">{order.order_number}</span>
      </nav>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">
              {order.order_number}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {formatDate(order.created_at)}
            </p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            {ORDER_STATUS_LABELS[order.status] ?? order.status}
          </span>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Teslimat Bilgileri
            </h2>
            <dl className="mt-2 space-y-1 text-sm">
              <div>
                <dt className="text-zinc-500">Alıcı</dt>
                <dd className="font-medium">{order.shipping_name}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Adres</dt>
                <dd className="font-medium">{order.shipping_address}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Telefon</dt>
                <dd className="font-medium">{order.shipping_phone}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Ödeme
            </h2>
            <dl className="mt-2 space-y-1 text-sm">
              <div>
                <dt className="text-zinc-500">Yöntem</dt>
                <dd className="font-medium">
                  {order.payment_method === "credit_card"
                    ? "Kredi Kartı"
                    : "Banka Kartı"}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Toplam</dt>
                <dd className="text-xl font-bold text-blue-600">
                  {formatPrice(order.total_amount)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Sipariş Kalemleri
          </h2>
          <ul className="mt-4 divide-y divide-zinc-100">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 py-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                  {item.product_image && (
                    <Image
                      src={item.product_image}
                      alt={item.product_name ?? "Ürün"}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  )}
                </div>
                <div className="flex flex-1 justify-between">
                  <div>
                    <p className="font-medium text-zinc-900">
                      {item.product_name}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {item.quantity} adet × {formatPrice(item.unit_price)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(item.unit_price * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
