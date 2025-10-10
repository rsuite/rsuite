type GetColumnsAndPathsOptions<T> = {
    getParent: (item: T) => T | undefined;
    getChildren: (item: T) => readonly T[] | undefined;
};
/**
 * Calculate columns to be displayed:
 *
 * - Every ancestor level of activeItem should be displayed
 * - The level that activeItem is at should be displayed
 * - If activeItem is a parent node, its child level should be displayed
 *
 * @param items
 * @param value
 * @param options
 * @returns
 */
export declare function getColumnsAndPaths<T extends Record<string, unknown>>(items: readonly T[], pathTarget: T | undefined, options: GetColumnsAndPathsOptions<T>): {
    columns: (readonly T[])[];
    path: T[];
};
export {};
