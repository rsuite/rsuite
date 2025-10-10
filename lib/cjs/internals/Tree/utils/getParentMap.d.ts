/// <reference types="react" />
/**
 * Returns a WeakMap that maps each item in `items` to its parent
 * indicated by `getChildren` function
 */
export declare function getParentMap<T extends Record<string, unknown>>(items: readonly T[], getChildren: (item: T) => readonly T[] | undefined): WeakMap<T, T>;
/**
 * Returns a Map that maps each item's "key", indicated by `getKey` function,
 * to its parent indicated by `getChildren` function
 *
 * NOTICE:
 * Using this function is discouraged.
 * Use {@link getParentMap} whenever possible.
 */
export declare function getKeyParentMap<T = Record<string, unknown>, K = React.Key>(items: readonly T[], getKey: (item: T) => K, getChildren: (item: T) => readonly T[] | undefined): Map<K, T>;
