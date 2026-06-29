"use client";

import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { useTranslations } from "@/context/LocaleProvider";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import type { SessionData } from "@/types";

interface HeaderProps {
  session: SessionData;
  cartCount?: number;
}

export function Header({ session, cartCount = 0 }: HeaderProps) {
  const { t } = useTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-blue-700 dark:text-blue-400">
          QybitShop
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 transition hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-zinc-600 transition hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
          >
            {t("nav.products")}
          </Link>
          {session.isLoggedIn && (
            <Link
              href="/orders"
              className="text-sm font-medium text-zinc-600 transition hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
            >
              {t("nav.orders")}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LocaleSwitcher />

          <Link
            href="/cart"
            className="relative rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {t("nav.cart")}
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {session.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:block"
              >
                {session.name}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  {t("nav.logout")}
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:block"
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {t("nav.register")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
