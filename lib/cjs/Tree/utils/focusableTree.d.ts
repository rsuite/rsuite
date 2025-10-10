import { TreeNode, TreeNodeMap } from '../../internals/Tree/types';
import { ListHandle } from '../../internals/Windowing';
interface FocusableItemsProps {
    disabledItemValues: any;
    valueKey: string;
    childrenKey: string;
    expandItemValues: any;
}
/**
 * Retrieves the focusable items from the filtered data based on the provided props.
 * Excludes nodes that are not visible or are disabled.
 */
export declare const getFocusableItems: <TItem extends TreeNode>(filteredData: TItem[], props: FocusableItemsProps, isSearching?: boolean) => TItem[];
/**
 * Retrieves the active item from the flattened nodes based on the provided focus item value.
 */
export declare const getActiveItem: (focusItemValue: string | number, flattenedNodes: TreeNodeMap, valueKey: string) => any;
/**
 * Focuses on a specific tree node element.
 *
 */
export declare const focusTreeNode: (refKey: string, treeNodeRefs: any) => void;
interface FocusItemProps {
    focusItemValue?: string | number | null;
    focusableItems: any[];
    treeNodesRefs: any;
    selector?: string;
    valueKey: string;
}
/**
 * Focuses on the next item in a tree.
 */
export declare const focusNextItem: (props: FocusItemProps) => any;
/**
 * Focuses on the previous item in a tree.
 */
export declare const focusPreviousItem: (props: FocusItemProps) => any;
interface ScrollToActiveTreeNodeProps {
    value: any;
    valueKey: string;
    virtualized: boolean;
    list?: ListHandle;
    formattedNodes: TreeNode[];
}
/**
 * Scrolls the list to the active tree node.
 *
 * @param props - The props object containing the necessary parameters.
 */
export declare function scrollToActiveTreeNode(props: ScrollToActiveTreeNodeProps): void;
export declare const focusCurrentItem: (props: {
    selector?: string;
    container?: HTMLElement | null;
}) => string | undefined;
export {};
