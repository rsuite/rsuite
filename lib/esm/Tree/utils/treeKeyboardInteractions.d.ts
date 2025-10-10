import type { TreeNode } from '../../internals/Tree/types';
export interface ArrowHandlerProps {
    focusItem: TreeNode;
    expand: boolean;
    childrenKey: string;
    onExpand?: (focusItem: TreeNode, expanded: boolean) => void;
    onFocusItem: () => void;
}
/**
 * Handles the left arrow key press event for tree navigation.
 * If the focus item is expanded, it collapses it. If the focus item is not expanded and has a parent,
 * it moves the focus to the parent item.
 */
export declare function handleLeftArrow(props: ArrowHandlerProps): void;
/**
 * Handles the right arrow key press event for tree navigation.
 * If the focused item has children and is collapsed, it expands the item.
 * If the focused item has children and is expanded, it moves the focus to the next sibling.
 * If the focused item does not have children, it does nothing.
 */
export declare function handleRightArrow(props: ArrowHandlerProps): void;
