import type { TreeNode, TreeNodeMap } from '../../internals/Tree/types';
interface UseFlattenTreeOptions {
    /**
     * The value of the tree.
     */
    value?: any;
    /**
     * Specifies whether the tree supports multiple selection.
     */
    multiple?: boolean;
    /**
     * The key used to access the label property of each tree node.
     */
    labelKey: string;
    /**
     * The key used to access the value property of each tree node.
     */
    valueKey: string;
    /**
     * The key used to access the children property of each tree node.
     */
    childrenKey: string;
    /**
     * Specifies whether the tree should cascade the selection to child nodes.
     */
    cascade?: boolean;
    /**
     * An array of item values that should not be selectable.
     */
    uncheckableItemValues?: any[];
    /**
     * A callback function that will be called when the tree nodes change.
     * It receives a map of the tree nodes.
     */
    callback?: (nodes: TreeNodeMap) => void;
}
/**
 * Custom hook that flattens a tree data structure into a map of nodes.
 *
 */
declare function useFlattenTree(data: TreeNode[], options: UseFlattenTreeOptions): TreeNodeMap;
export default useFlattenTree;
