import { TreeNode, TreeNodeMap } from '../types';
import { shallowEqual } from '../../utils';
import { ListHandle } from '../../internals/Windowing';

interface FocusableItemsProps {
  disabledItemValues: any;
  valueKey: string;
  childrenKey: string;
  expandItemValues: any;
}

/**
 * get all focusable items
 * exclude not visible and disabled node
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
 * return all focusable Item and active Element index
 * @param focusItemValue
 * @param focusableItems items
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
 * get current active element and node data
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

const getElementByDataKey = (dataKey: string, treeNodesRefs: any, selector: string) => {
  const ele = treeNodesRefs[dataKey];
  if (ele instanceof Element) {
    return ele.querySelector(selector);
  }
  return null;
};

/**
 * focus to specify tree node
 * @param refKey - target node refKey
 * @param treeNodeRefs - all tree node refs object
 * @param selector - node css selector
 */
export const focusTreeNode = (refKey: string, treeNodeRefs: any, selector: string) => {
  const node: any = getElementByDataKey(refKey, treeNodeRefs, selector);
  node?.focus?.();
};

interface FocusPrevOrNextProps {
  focusItemValue: string | number | null;
  focusableItems: any[];
  treeNodesRefs: any;
  selector: string;
  valueKey: string;
  callback: (value: string | number) => void;
}

/**
 * focus next item with keyboard
 * @param param
 */
export const focusNextItem = ({
  focusItemValue,
  focusableItems,
  treeNodesRefs,
  selector,
  valueKey,
  callback
}: FocusPrevOrNextProps) => {
  const activeIndex = getActiveIndex(focusItemValue, focusableItems, valueKey);
  if (focusableItems.length === 0) {
    return;
  }
  const nextIndex = activeIndex === focusableItems.length - 1 ? 0 : activeIndex + 1;
  const nextFocusItemValue = focusableItems[nextIndex][valueKey];
  callback?.(nextFocusItemValue);
  focusTreeNode(focusableItems[nextIndex].refKey, treeNodesRefs, selector);
};

/**
 * focus prev item with keyboard
 * @param param
 */
export const focusPreviousItem = ({
  focusItemValue,
  focusableItems,
  treeNodesRefs,
  selector,
  valueKey,
  callback
}: FocusPrevOrNextProps) => {
  const activeIndex = getActiveIndex(focusItemValue, focusableItems, valueKey);
  if (focusableItems.length === 0) {
    return;
  }

  let prevIndex = activeIndex === 0 ? focusableItems.length - 1 : activeIndex - 1;
  prevIndex = prevIndex >= 0 ? prevIndex : 0;
  const prevFocusItemValue = focusableItems[prevIndex][valueKey];
  callback?.(prevFocusItemValue);
  focusTreeNode(focusableItems[prevIndex].refKey, treeNodesRefs, selector);
};

export interface FocusToTreeNodeProps {
  selector: string;
  valueKey: string;
  activeNode: any;
  virtualized: boolean;
  container: HTMLElement | null;
  list: ListHandle;
  formattedNodes: TreeNode[];
}

/**
 * Returns the index of the first visible node in the tree that matches the given value.
 *
 */
const getScrollToIndex = (nodes: readonly TreeNode[], value: string | number, valueKey: string) =>
  nodes.filter(n => n.visible).findIndex(item => item[valueKey] === value);

/**
 * Focus to active tree node.
 */
export function focusToActiveTreeNode({
  list,
  valueKey,
  activeNode,
  virtualized,
  container,
  selector,
  formattedNodes
}: FocusToTreeNodeProps) {
  if (!container) return;

  if (virtualized && activeNode) {
    const scrollIndex = getScrollToIndex(formattedNodes, activeNode?.[valueKey], valueKey);
    list.scrollToRow?.(scrollIndex);
    return;
  }

  const activeItem: any = container.querySelector(selector);
  if (!activeItem) {
    return;
  }

  activeItem?.focus?.();
}
