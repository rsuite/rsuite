/**
 * Returns a WeakMap that maps each item in `items` to its parent
 * indicated by `getChildren` function
 */
export function getParentMap<T extends Record<string, unknown>>(
  items: readonly T[],
  getChildren: (item: T) => readonly T[] | undefined
) {
  const map = new WeakMap<T, T>();
  for (const queue = [...items]; queue.length > 0; ) {
    const item = queue.shift() as T;
    const children = getChildren(item);

    if (children) {
      for (const child of children) {
        map.set(child, item);
        queue.push(child);
      }
    }
  }

  return map;
}

/**
 * Returns a Map that maps each item's "key", indicated by `getKey` function,
 * to its parent indicated by `getChildren` function
 *
 * NOTICE:
 * Using this function is discouraged.
 * Use {@link getParentMap} whenever possible.
 */
export function getKeyParentMap<T = Record<string, unknown>, K = React.Key>(
  items: readonly T[],
  getKey: (item: T) => K,
  getChildren: (item: T) => readonly T[] | undefined
) {
  const map = new Map<K, T>();
  for (const queue = [...items]; queue.length > 0; ) {
    const item = queue.shift() as T;
    const children = getChildren(item);

    if (children) {
      for (const child of children) {
        map.set(getKey(child), item);
        queue.push(child);
      }
    }
  }

  return map;
}
