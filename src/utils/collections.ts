/**
 * Filters an array of items based on a predicate function.
 * Returns a new array containing only items for which the predicate returns true.
 * 
 * @template T - The type of items in the array
 * @param items - The array to filter
 * @param predicate - Function that returns true for items to include
 * @returns New array with filtered items
 * 
 * @example
 * const leads = [...];
 * const binationalLeads = filterBy(leads, l => l.operatingCountry === "Both");
 */
export function filterBy<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

/**
 * Sorts an array by a selected key in ascending or descending order.
 * Returns a new sorted array without modifying the original.
 * 
 * @template T - The type of items in the array
 * @template K - The type of the sort key (string, number, or Date)
 * @param items - The array to sort
 * @param selector - Function that returns the sort key for each item
 * @param direction - "asc" for ascending (default) or "desc" for descending
 * @returns New sorted array
 * 
 * @example
 * const leads = [...];
 * const sorted = sortBy(leads, l => l.id, "asc");
 * const reverse = sortBy(leads, l => l.monthlyVolume, "desc");
 */
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

/**
 * Groups items by a selected key into a Record where each key maps to an array of items.
 * 
 * @template T - The type of items in the array
 * @template K - The type of the grouping key (must be a valid object key)
 * @param items - The array to group
 * @param selector - Function that returns the grouping key for each item
 * @returns Object where each key maps to an array of items with that key
 * 
 * @example
 * const leads = [...];
 * const byStatus = groupBy(leads, l => l.status);
 * // Returns: { new: [...], qualified: [...], ... }
 */
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
