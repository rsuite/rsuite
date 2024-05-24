import isEmpty from 'lodash/isEmpty';
import type { TreeNode } from '@/internals/Tree/types';

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
export function handleLeftArrow(props: ArrowHandlerProps) {
  const { focusItem, expand, onExpand, onFocusItem } = props;
  if (isEmpty(focusItem)) {
    return;
  }

  if (expand) {
    onExpand?.(focusItem, expand);
  } else if (focusItem?.parent) {
    onFocusItem();
  }
}

/**
 * Handles the right arrow key press event for tree navigation.
 * If the focused item has children and is collapsed, it expands the item.
 * If the focused item has children and is expanded, it moves the focus to the next sibling.
 * If the focused item does not have children, it does nothing.
 */
export function handleRightArrow(props: ArrowHandlerProps) {
  const { focusItem, expand, childrenKey, onExpand, onFocusItem } = props;

  if (isEmpty(focusItem) || !Array.isArray(focusItem[childrenKey])) {
    return;
  }

  if (!expand) {
    onExpand?.(focusItem, expand);
  } else {
    onFocusItem();
  }
}
