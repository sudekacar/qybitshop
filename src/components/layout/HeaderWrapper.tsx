"use client";

import { useCart } from "@/context/CartProvider";
import { Header } from "./Header";
import type { SessionData } from "@/types";

interface HeaderWrapperProps {
  session: SessionData;
}

export function HeaderWrapper({ session }: HeaderWrapperProps) {
  const { itemCount } = useCart();
  return <Header session={session} cartCount={itemCount} />;
}
