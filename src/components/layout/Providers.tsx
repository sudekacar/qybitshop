"use client";

import { CartProvider } from "@/context/CartProvider";
import { LocaleProvider } from "@/context/LocaleProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { HeaderWrapper } from "./HeaderWrapper";
import type { SessionData } from "@/types";

interface ProvidersProps {
  children: React.ReactNode;
  session: SessionData;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <CartProvider>
          <HeaderWrapper session={session} />
          <main className="flex-1">{children}</main>
        </CartProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
