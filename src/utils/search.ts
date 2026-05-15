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
