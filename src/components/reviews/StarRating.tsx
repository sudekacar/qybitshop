interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md";
}

export function StarRating({ rating, max = 5, size = "md" }: StarRatingProps) {
  const sizeClass = size === "sm" ? "text-sm" : "text-lg";

  return (
    <div className={`flex gap-0.5 ${sizeClass}`} aria-label={`${rating}/${max}`}>
      {Array.from({ length: max }, (_, index) => {
        const filled = index < Math.round(rating);
        return (
          <span
            key={index}
            className={filled ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600"}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
