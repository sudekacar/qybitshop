"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useTranslations } from "@/context/LocaleProvider";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslations();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");
  const debouncedQuery = useDebounce(query, 400);
  const [isPending, startTransition] = useTransition();
  const paramsStringRef = useRef(searchParams.toString());

  useEffect(() => {
    paramsStringRef.current = searchParams.toString();
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(paramsStringRef.current);
    if (debouncedQuery) {
      params.set("search", debouncedQuery);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }, [debouncedQuery, router, startTransition]);

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("products.search")}
        className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-4 pr-10 text-sm text-zinc-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
      />
      {isPending && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
          ...
        </span>
      )}
    </div>
  );
}
