/**
 * Strategy for walking the tree.
 */
export declare enum WalkTreeStrategy {
    DFS = 0,
    BFS = 1
}
/**
 * Flattens a tree structure into an array.
 */
export declare function flattenTree<T>(rootNodes: readonly T[], getChildren: (node: T) => readonly T[] | undefined, walkStrategy?: WalkTreeStrategy): T[];
/**
 * Walks the tree in a breadth-first search (BFS) manner.
 */
export declare function walkTreeBfs<T>(rootNodes: readonly T[], getChildren: (node: T) => readonly T[] | undefined, callback: (node: T) => void): void;
/**
 * Walks the tree in a depth-first search (DFS) manner.
 */
export declare function walkTreeDfs<T>(rootNodes: readonly T[], getChildren: (node: T) => readonly T[] | undefined, callback: (node: T) => void): void;
/**
 * Flattens a tree structure to an array (deprecated).
 * @deprecated This function is considered unsafe because it mutates the `tree` argument in-place.
 *             Use the `flattenTree` function instead.
 */
export declare function UNSAFE_flattenTree<TItem>(tree: TItem[], childrenKey?: string, executor?: (node: any, index: number) => any): TItem[];
