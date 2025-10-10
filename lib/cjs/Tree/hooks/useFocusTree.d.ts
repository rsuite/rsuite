/// <reference types="react" />
import type { TreeNode } from '../../internals/Tree/types';
interface UseFocusTreeProps<T extends TreeNode> {
    filteredData: T[];
    disabledItemValues: any[];
    expandItemValues: any[];
    searchKeyword: string;
    flattenedNodes: any;
    onExpand?: (nodeData: T, expanded: boolean) => void;
    onFocused?: (value: TreeNode['value']) => void;
}
/**
 * Custom hook that manages the focus behavior of a tree component.
 */
declare function useFocusTree(props: UseFocusTreeProps<TreeNode>): {
    treeViewRef: import("react").RefObject<HTMLDivElement>;
    focusTreeFirstNode: (...args: any[]) => any;
    focusItemValue: string | number | null | undefined;
    treeNodesRefs: {};
    saveTreeNodeRef: (ref: import("react").Ref<any>, refKey?: string | undefined) => void;
    setFocusItemValue: import("react").Dispatch<import("react").SetStateAction<string | number | null | undefined>>;
    onTreeKeydown: (...args: any[]) => any;
};
export default useFocusTree;
