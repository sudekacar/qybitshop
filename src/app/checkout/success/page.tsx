import { notFound, redirect } from "next/navigation";
import { OrderSuccessClient } from "@/components/checkout/OrderSuccessClient";
import { getOrderByIdForUser } from "@/lib/orders";
import { getSession } from "@/lib/session";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    redirect("/login");
  }

  const params = await searchParams;
  const orderId = params.orderId ? parseInt(params.orderId, 10) : NaN;

  if (Number.isNaN(orderId)) {
    notFound();
  }

  const order = getOrderByIdForUser(orderId, session.userId);
  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <OrderSuccessClient order={order} />
    </div>
  );
}
