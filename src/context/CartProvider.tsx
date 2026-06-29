"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types";
import { parseCartItemsFromUnknown } from "@/lib/validators";

const CART_STORAGE_KEY = "cart";

type CartAction =
  | { type: "ADD_ITEM"; productId: number; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; items: CartItem[] };

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
}

interface CartContextValue {
  items: CartItem[];
  isHydrated: boolean;
  itemCount: number;
  addItem: (productId: number, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items, isHydrated: true };

    case "ADD_ITEM": {
      const quantity = action.quantity ?? 1;
      const existing = state.items.find(
        (item) => item.productId === action.productId
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { productId: action.productId, quantity }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.productId),
      };

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.productId !== action.productId
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    return parseCartItemsFromUnknown(parsed);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isHydrated: false,
  });

  useEffect(() => {
    dispatch({ type: "HYDRATE", items: loadCartFromStorage() });
  }, []);

  useEffect(() => {
    if (!state.isHydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, state.isHydrated]);

  const addItem = useCallback((productId: number, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", productId, quantity });
  }, []);

  const removeItem = useCallback((productId: number) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const getItemQuantity = useCallback(
    (productId: number) =>
      state.items.find((item) => item.productId === productId)?.quantity ?? 0,
    [state.items]
  );

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      isHydrated: state.isHydrated,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
    }),
    [
      state.items,
      state.isHydrated,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
