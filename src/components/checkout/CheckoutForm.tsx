"use client";

import { useActionState } from "react";
import { checkoutAction, type CheckoutState } from "@/actions/orders";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import type { CartLineItem } from "@/lib/type-guards";

interface CheckoutFormProps {
  cartItems: CartLineItem<Product>[];
  subtotal: number;
  cartData: string;
}

const initialState: CheckoutState = {};

export function CheckoutForm({
  cartItems,
  subtotal,
  cartData,
}: CheckoutFormProps) {
  const [state, formAction, isPending] = useActionState(
    checkoutAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="cartData" value={cartData} />

      {state.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Teslimat Bilgileri</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="shippingName" className="mb-1 block text-sm font-medium text-zinc-700">
              Alıcı Adı
            </label>
            <input
              id="shippingName"
              name="shippingName"
              required
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="shippingAddress" className="mb-1 block text-sm font-medium text-zinc-700">
              Teslimat Adresi
            </label>
            <textarea
              id="shippingAddress"
              name="shippingAddress"
              required
              rows={3}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="shippingPhone" className="mb-1 block text-sm font-medium text-zinc-700">
              Telefon
            </label>
            <input
              id="shippingPhone"
              name="shippingPhone"
              type="tel"
              required
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="05XX XXX XX XX"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Ödeme Bilgileri</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Bu bir simülasyondur — gerçek ödeme yapılmaz.
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Ödeme Yöntemi
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  defaultChecked
                />
                Kredi Kartı
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="paymentMethod" value="debit_card" />
                Banka Kartı
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="cardNumber" className="mb-1 block text-sm font-medium text-zinc-700">
              Kart Numarası
            </label>
            <input
              id="cardNumber"
              name="cardNumber"
              required
              maxLength={16}
              placeholder="4242 4242 4242 4242"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cardExpiry" className="mb-1 block text-sm font-medium text-zinc-700">
                Son Kullanma
              </label>
              <input
                id="cardExpiry"
                name="cardExpiry"
                required
                placeholder="MM/YY"
                className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label htmlFor="cardCvv" className="mb-1 block text-sm font-medium text-zinc-700">
                CVV
              </label>
              <input
                id="cardCvv"
                name="cardCvv"
                required
                maxLength={4}
                placeholder="123"
                className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Sipariş Özeti</h2>
        <ul className="mt-4 divide-y divide-zinc-100">
          {cartItems.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex justify-between py-3 text-sm"
            >
              <span className="text-zinc-600">
                {product.name} × {quantity}
              </span>
              <span className="font-medium">
                {formatPrice(product.price * quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-zinc-200 pt-4">
          <span className="font-semibold">Toplam</span>
          <span className="text-xl font-bold text-blue-600">
            {formatPrice(subtotal)}
          </span>
        </div>
      </section>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 py-4 text-lg font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Sipariş oluşturuluyor..." : "Siparişi Onayla"}
      </button>
    </form>
  );
}
