/**
 * Linear search finds the first item matching a predicate in an unsorted array.
 * Iterates through each element until a match is found.
 * Time complexity: O(n)
 * 
 * @template T - The type of items in the array
 * @param items - The array to search
 * @param predicate - Function that returns true for the item you're looking for
 * @returns The first matching item, or undefined if not found
 * 
 * @example
 * const newLead = linearSearch(leads, l => l.status === "new");
 */
export function linearSearch<T>(
  items: T[],
  predicate: (item: T) => boolean
): T | undefined {
  for (const item of items) {
    if (predicate(item)) {
      return item;
    }
  }

  return undefined;
}

/**
 * Binary search finds an item by a key in a SORTED array.
 * Uses divide-and-conquer for efficient lookup.
 * Time complexity: O(log n)
 * 
 * ⚠️ IMPORTANT: Input array must be sorted by the selector key!
 * Use sortBy() first if the array is not guaranteed to be sorted.
 * 
 * @template T - The type of items in the array
 * @template K - The type of the search key (string or number)
 * @param items - The SORTED array to search
 * @param target - The key value you're searching for
 * @param selector - Function that returns the key for each item
 * @returns The matching item, or undefined if not found
 * 
 * @example
 * const leads = sortBy(allLeads, l => l.id);
 * const found = binarySearch(leads, "lead-3", l => l.id);
 */
export function binarySearch<T, K extends string | number>(
  items: T[],
  target: K,
  selector: (item: T) => K
): T | undefined {
  let left = 0;
  let right = items.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const value = selector(items[middle]);

    if (value === target) {
      return items[middle];
    }

    if (value < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return undefined;
}
