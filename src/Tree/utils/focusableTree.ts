import { TreeNode, TreeNodeMap } from '@/internals/Tree/types';
import { shallowEqual } from '@/internals/utils';
import { ListHandle } from '@/internals/Windowing';

interface FocusableItemsProps {
  disabledItemValues: any;
  valueKey: string;
  childrenKey: string;
  expandItemValues: any;
}

// Active tree node selector
const SELECTED_TREEITEM_SELECTOR = '[role="treeitem"][aria-selected="true"]';

/**
 * Retrieves the focusable items from the filtered data based on the provided props.
 * Excludes nodes that are not visible or are disabled.
 */
export const getFocusableItems = <TItem extends TreeNode>(
  filteredData: TItem[],
  props: FocusableItemsProps,
  isSearching?: boolean
): TItem[] => {
  const { disabledItemValues, valueKey, childrenKey, expandItemValues } = props;
  const items: TItem[] = [];
  const loop = (nodes: TItem[]) => {
    nodes.forEach((node: TItem) => {
      const disabled = disabledItemValues.some(disabledItem =>
        shallowEqual(disabledItem, node[valueKey])
      );
      if (!disabled && node.visible) {
        items.push(node);
      }
      // always expand when searching
      const expand = isSearching ? true : expandItemValues.includes(node[valueKey]);
      if (node[childrenKey] && expand) {
        loop(node[childrenKey]);
      }
    });
  };

  loop(filteredData);
  return items;
};

/**
 * Returns the index of the active item in the focusItems array.
 *
 */
const getActiveIndex = (focusItemValue, focusItems: any[], valueKey) => {
  let activeIndex = -1;
  focusItems.forEach((item, index) => {
    if (shallowEqual(item[valueKey], focusItemValue)) {
      activeIndex = index;
    }
  });
  return activeIndex;
};

/**
 * Retrieves the active item from the flattened nodes based on the provided focus item value.
 */
export const getActiveItem = (
  focusItemValue: string | number,
  flattenedNodes: TreeNodeMap,
  valueKey: string
) => {
  let nodeData: any = null;
  const activeNode = Object.values(flattenedNodes).find(node =>
    shallowEqual(node[valueKey], focusItemValue)
  );
  if (activeNode) {
    nodeData = activeNode;
  }

  return nodeData;
};

/**
 * Focuses on a specific tree node element.
 *
 */
export const focusTreeNode = (refKey: string, treeNodeRefs: any) => {
  const treeItem = treeNodeRefs[refKey];

  treeItem?.focus?.();
};

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
export const focusNextItem = (props: FocusItemProps) => {
  const { focusItemValue, focusableItems, treeNodesRefs, valueKey } = props;
  const activeIndex = getActiveIndex(focusItemValue, focusableItems, valueKey);

  if (focusableItems.length === 0) {
    return;
  }

  const nextIndex = activeIndex === focusableItems.length - 1 ? 0 : activeIndex + 1;
  const value = focusableItems[nextIndex][valueKey];

  focusTreeNode(focusableItems[nextIndex].refKey, treeNodesRefs);

  return value;
};

/**
 * Focuses on the previous item in a tree.
 */
export const focusPreviousItem = (props: FocusItemProps) => {
  const { focusItemValue, focusableItems, treeNodesRefs, valueKey } = props;
  const activeIndex = getActiveIndex(focusItemValue, focusableItems, valueKey);

  if (focusableItems.length === 0) {
    return;
  }

  let prevIndex = activeIndex === 0 ? focusableItems.length - 1 : activeIndex - 1;
  prevIndex = prevIndex >= 0 ? prevIndex : 0;

  const value = focusableItems[prevIndex][valueKey];

  focusTreeNode(focusableItems[prevIndex].refKey, treeNodesRefs);

  return value;
};

/**
 * Returns the index of the first visible node in the tree that matches the given value.
 */
const getScrollToIndex = (nodes: readonly TreeNode[], value: string | number, valueKey: string) => {
  return nodes.filter(n => n.visible).findIndex(item => item[valueKey] === value);
};

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
export function scrollToActiveTreeNode(props: ScrollToActiveTreeNodeProps) {
  const { list, value, valueKey, virtualized, formattedNodes } = props;

  if (virtualized && value) {
    const scrollIndex = getScrollToIndex(formattedNodes, value, valueKey);
    list?.scrollToItem?.(scrollIndex);
  }
}

export const focusCurrentItem = (props: { selector?: string; container?: HTMLElement | null }) => {
  const { selector = SELECTED_TREEITEM_SELECTOR, container } = props;

  const activeItem = container?.querySelector(selector) as HTMLElement;

  if (activeItem) {
    activeItem?.focus?.();

    return activeItem.dataset?.key;
  }
};
