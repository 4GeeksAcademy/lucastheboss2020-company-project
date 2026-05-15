export function filterBy<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

export function sortBy<T, K extends string | number | Date>(
  items: T[],
  selector: (item: T) => K,
  direction: "asc" | "desc" = "asc"
): T[] {
  const sorted = [...items].sort((a, b) => {
    const left = selector(a);
    const right = selector(b);

    if (left < right) return -1;
    if (left > right) return 1;
    return 0;
  });

  return direction === "asc" ? sorted : sorted.reverse();
}

export function groupBy<T, K extends PropertyKey>(
  items: T[],
  selector: (item: T) => K
): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const key = selector(item);
    const existing = acc[key] ?? [];
    acc[key] = [...existing, item];
    return acc;
  }, {} as Record<K, T[]>);
}
