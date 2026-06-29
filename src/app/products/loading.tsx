export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 h-10 w-48 animate-pulse rounded-lg bg-zinc-200" />
      <div className="grid gap-8 lg:grid-cols-4">
        <div className="h-96 animate-pulse rounded-xl bg-zinc-200" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-xl bg-zinc-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
