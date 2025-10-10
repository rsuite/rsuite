type UsePathsParams<T> = {
    data: T[];
    /**
     * The item where the focus is on
     */
    activeItem: T | undefined;
    /**
     * The item selected by Cascader's value
     */
    selectedItem: T | undefined;
    getParent: (item: T) => T | undefined;
    getChildren: (item: T) => readonly T[] | undefined;
};
/**
 * A Hook to get the selected path of Tree.
 *
 * - The columns of items to be displayed
 * - The path towards the current focused item
 * - The path towards the current selected item (referred to by Cascader's value)
 *
 */
export declare function usePaths<T extends Record<string, unknown>>({ data, activeItem, selectedItem, getParent, getChildren }: UsePathsParams<T>): {
    columns: (readonly T[])[];
    pathTowardsSelectedItem: NonNullable<T>[];
    pathTowardsActiveItem: T[];
};
export default usePaths;
