import Link from "next/link";
import { redirect } from "next/navigation";
import { formatDate, formatPrice, ORDER_STATUS_LABELS } from "@/lib/format";
import { getOrdersByUserId } from "@/lib/orders";
import { getSession } from "@/lib/session";

export default async function OrdersPage() {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    redirect("/login");
  }

  const orders = getOrdersByUserId(session.userId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900">Siparişlerim</h1>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-16 text-center">
          <p className="text-lg font-medium text-zinc-600">
            Henüz siparişiniz yok
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold text-blue-600">
                    {order.order_number}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
                    {ORDER_STATUS_LABELS[order.status] ?? order.status}
                  </span>
                  <span className="text-lg font-bold text-zinc-900">
                    {formatPrice(order.total_amount)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
