import type { TreeNode } from '../../internals/Tree/types';
interface DefaultExpandItemValuesOptions {
    valueKey: string;
    defaultExpandAll: boolean;
    childrenKey: string;
    defaultExpandItemValues?: any[];
}
export declare function getDefaultExpandItemValues<TItem>(data: TItem[], options: DefaultExpandItemValuesOptions): any[];
interface UseExpandTreeProps<T extends TreeNode> {
    /**
     * Specifies whether all tree nodes should be expanded by default.
     */
    defaultExpandAll: boolean;
    /**
     * The key used to access the value of a tree node.
     */
    valueKey: string;
    /**
     * The key used to access the children of a tree node.
     */
    childrenKey: string;
    /**
     * An array of values that should be expanded by default.
     */
    defaultExpandItemValues: any[];
    /**
     * An optional array of values that control the expanded items.
     */
    controlledExpandItemValues?: any[];
    /**
     * A callback function that is called when the tree is expanded.
     *
     * @param expandItemValues - The expanded item values.
     * @param activeNode - The active tree node.
     * @param concat - A function to concatenate the data and children of a tree node.
     */
    onExpand?: (expandItemValues: T[], activeNode: T, concat: (data: T[], children: T[]) => T[]) => void;
    /**
     * A function that returns the children of a tree node.
     *
     * @param node - The tree node.
     * @returns The children of the tree node.
     */
    getChildren?: (node: T) => T[] | Promise<T[]>;
    /**
     * A function that appends a child to a tree node.
     *
     * @param node - The tree node.
     * @param getChildren - A function that returns the children of a tree node.
     */
    appendChild: (node: T, getChildren: (node: T) => T[] | Promise<T[]>) => void;
}
/**
 * Custom hook for managing tree expansion state.
 */
declare function useExpandTree(data: TreeNode[], props: UseExpandTreeProps<TreeNode>): {
    expandItemValues: any[];
    handleExpandTreeNode: (...args: any[]) => any;
};
export default useExpandTree;
