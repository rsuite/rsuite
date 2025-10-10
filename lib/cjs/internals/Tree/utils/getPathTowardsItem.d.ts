/**
 * Returns an array indicating the hierarchy path from root towards `target` item
 */
export declare function getPathTowardsItem<T>(target: T | undefined, getParent: (item: T) => T | undefined): NonNullable<T>[];
