import React, { useRef, useState, useEffect, useCallback } from 'react';
import { intersection, isUndefined, omit, isArray, isNil, clone, isEmpty } from 'lodash';
import shallowEqualArray from '../utils/shallowEqualArray';
import { TreeNodeType, TreeNodesType, getNodeCheckState } from '../CheckTreePicker/utils';
import { TREE_NODE_DROP_POSITION, shallowEqual } from '../utils';
import { CheckTreePickerProps } from '../CheckTreePicker/CheckTreePicker';
import { TreePickerProps } from '../TreePicker/TreePicker';
import { shouldDisplay } from '../internals/Picker';
import reactToString from './reactToString';
import { ListHandle } from '../internals/Windowing';
import { TREE_NODE_PADDING, TREE_NODE_ROOT_PADDING } from './constants';
import { attachParent } from './attachParent';

type PartialTreeProps = Partial<TreePickerProps | CheckTreePickerProps>;

// gap of tree node
const TREE_NODE_GAP = 4;

/**
 * according node parentNode expand state decide node whether to show
 * @param {*} expandItemValues
 * @param {*} parentKeys
 */
export function shouldShowNodeByParentExpanded<T>(
  expandItemValues: T[] = [],
  parentKeys: T[] = []
) {
  const intersectionKeys = intersection(expandItemValues, parentKeys);
  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }
  return false;
}

/**
 * flatten tree structure to array
 * @param {*} tree
 * @param {*} childrenKey
 * @param {*} executor
 *
 * @deprecated This {@link UNSAFE_flattenTree} function is considered unsafe because it mutates `tree` argument in-place
 *             Use {@link flattenTree} instead.
 */
export function UNSAFE_flattenTree<TItem>(
  tree: TItem[],
  childrenKey = 'children',
  executor?: (node: any, index: number) => any
): TItem[] {
  const flattenData: TItem[] = [];
  const traverse = (data: any[], parent: any | null) => {
    if (!isArray(data)) {
      return;
    }

    data.forEach((item: any, index: number) => {
      const node: any = typeof executor === 'function' ? executor(item, index) : item;

      flattenData.push(attachParent(node, parent));

      if (item[childrenKey]) {
        traverse(item[childrenKey], item);
      }
    });
  };

  traverse(tree, null);
  return flattenData;
}

export enum WalkTreeStrategy {
  DFS,
  BFS
}

export function flattenTree<T>(
  rootNodes: readonly T[],
  getChildren: (node: T) => readonly T[] | undefined,
  walkStrategy = WalkTreeStrategy.BFS
) {
  const result: T[] = [];

  if (walkStrategy === WalkTreeStrategy.BFS) {
    walkTreeBfs(rootNodes, getChildren, node => result.push(node));
  } else if (walkStrategy === WalkTreeStrategy.DFS) {
    walkTreeDfs(rootNodes, getChildren, node => result.push(node));
  }

  return result;
}

export function walkTreeBfs<T>(
  rootNodes: readonly T[],
  getChildren: (node: T) => readonly T[] | undefined,
  callback: (node: T) => void
) {
  for (const queue = [...rootNodes]; queue.length > 0; ) {
    const node = queue.shift() as T;
    callback(node);

    const children = getChildren(node);

    if (children) {
      queue.push(...children);
    }
  }
}

export function walkTreeDfs<T>(
  rootNodes: readonly T[],
  getChildren: (node: T) => readonly T[] | undefined,
  callback: (node: T) => void
) {
  for (const node of rootNodes) {
    callback(node);
    const children = getChildren(node);

    if (children) {
      walkTreeDfs(children, getChildren, callback);
    }
  }
}

/**
 * get all ancestor nodes of given node
 * @param {*} node
 */
export function getNodeParents(node: any, parentKey = 'parent', valueKey?: string) {
  const parents: any[] = [];
  const traverse = (node: any) => {
    if (node?.[parentKey]) {
      traverse(node[parentKey]);

      if (valueKey) {
        parents.push(node[parentKey][valueKey]);
      } else {
        parents.push(node[parentKey]);
      }
    }
  };

  traverse(node);

  return parents;
}

/**
 * get all parentKeys of given node
 * @param nodes
 * @param node
 * @param valueKey
 */
export function getNodeParentKeys<T>(nodes: TreeNodesType, node: TreeNodeType, valueKey: string) {
  const parentKeys: T[] = [];
  const traverse = (node: TreeNodeType) => {
    if (node?.parent?.refKey) {
      traverse(nodes[node.parent.refKey]);
      parentKeys.push(node?.parent?.[valueKey]);
    }
  };

  traverse(node);
  return parentKeys;
}

export function hasVisibleChildren(node: TreeNodeType, childrenKey: string) {
  if (!Array.isArray(node[childrenKey])) {
    return false;
  }

  return node[childrenKey].some((child: TreeNodeType) => child.visible);
}

/**
 * shallow equal array
 * @param a
 * @param b
 */
export function compareArray(a: any[], b: any[]) {
  return isArray(a) && isArray(b) && !shallowEqualArray(a, b);
}

export function getDefaultExpandItemValues<TItem>(
  data: TItem[],
  props: Required<
    Pick<
      TreePickerProps,
      'defaultExpandAll' | 'valueKey' | 'childrenKey' | 'defaultExpandItemValues'
    >
  >
) {
  const { valueKey, defaultExpandAll, childrenKey, defaultExpandItemValues = [] } = props;
  if (defaultExpandAll) {
    return UNSAFE_flattenTree(data, childrenKey)
      .filter(item => Array.isArray(item[childrenKey]) && item[childrenKey].length > 0)
      .map(item => item[valueKey]);
  }
  return defaultExpandItemValues;
}

/**
 * 获取 expandItemValues 的 value
 * @param props
 */
export function getExpandItemValues(props: PartialTreeProps) {
  const { expandItemValues, defaultExpandItemValues } = props;
  if (!isUndefined(expandItemValues) && Array.isArray(expandItemValues)) {
    return expandItemValues;
  }

  if (!isUndefined(defaultExpandItemValues) && Array.isArray(defaultExpandItemValues)) {
    return defaultExpandItemValues;
  }
  return [];
}

/**
 * get dragNode and it's children node keys
 * @param node
 * @param childrenKey
 * @param valueKey
 */
export function getDragNodeKeys(dragNode: any, childrenKey: string, valueKey: string) {
  let dragNodeKeys: any[] = [dragNode[valueKey]];
  const traverse = (data: any) => {
    if (data?.length > 0) {
      data.forEach((node: any) => {
        dragNodeKeys = dragNodeKeys.concat([node[valueKey]]);
        if (node[childrenKey]) {
          traverse(node[childrenKey]);
        }
      });
    }
  };

  traverse(dragNode[childrenKey]);

  return dragNodeKeys;
}

export function calDropNodePosition(event: React.DragEvent, treeNodeElement: Element) {
  const { clientY } = event;
  const { top, bottom } = treeNodeElement.getBoundingClientRect();
  const gap = TREE_NODE_GAP;

  // bottom of node
  if (clientY >= bottom - gap && clientY <= bottom) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM;
  }

  // top of node
  if (clientY <= top + gap && clientY >= top) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER_TOP;
  }

  if (clientY >= top + gap && clientY <= bottom - gap) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER;
  }
  return -1;
}

export function removeDragNode(data: any[], params: any, { valueKey, childrenKey }) {
  const { dragNode } = params;
  const traverse = (items: any[], parent?: any) => {
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      if (shallowEqual(item[valueKey], dragNode[valueKey])) {
        items.splice(index, 1);
        // when children is empty, delete children prop for hidden anchor
        if (items.length === 0 && parent) {
          delete parent.children;
        }
        break;
      }

      if (Array.isArray(item[childrenKey])) {
        traverse(item[childrenKey], item);
      }
    }
  };
  traverse(data);
}

export function createUpdateTreeDataFunction(params: any, { valueKey, childrenKey }) {
  return function (tree: any[]) {
    const data = [...tree];
    const { dragNode, dropNode, dropNodePosition } = params;
    const cloneDragNode = { ...dragNode };
    removeDragNode(data, params, { valueKey, childrenKey });
    const updateTree = (items: any[]) => {
      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];

        if (shallowEqual(item[valueKey], dropNode[valueKey])) {
          // drag to node inside
          if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER) {
            item[childrenKey] = isNil(item[childrenKey]) ? [] : item[childrenKey];
            item[childrenKey].push(cloneDragNode);
            break;
          } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_TOP) {
            // drag to top of node
            items.splice(index, 0, cloneDragNode);
            break;
          } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM) {
            // drag to bottom of node
            items.splice(index + 1, 0, cloneDragNode);
            break;
          }
        }

        if (Array.isArray(item[childrenKey]) && item[childrenKey].length > 0) {
          updateTree(item[childrenKey]);
        }
      }
    };

    updateTree(data);
    return [...data];
  };
}

export function findNodeOfTree(data, check) {
  const findNode = (nodes: readonly TreeNodeType[] = []) => {
    for (let i = 0; i < nodes.length; i += 1) {
      const item = nodes[i];
      if (isArray(item.children)) {
        const node = findNode(item.children);
        if (node) {
          return node;
        }
      }

      if (check(item)) {
        return item;
      }
    }

    return undefined;
  };

  return findNode(data);
}

type HasChildren<T extends Record<string, unknown>> = T & {
  children?: readonly HasChildren<T>[];
};

export function filterNodesOfTree<TItem extends HasChildren<Record<string, unknown>>>(
  data: readonly TItem[],
  check: (item: TItem) => boolean
): TItem[] {
  const findNodes = (nodes: readonly TItem[] = []) => {
    const nextNodes: TItem[] = [];
    for (let i = 0; i < nodes.length; i += 1) {
      if (isArray(nodes[i].children)) {
        const nextChildren = findNodes(nodes[i].children as TItem[]);
        if (nextChildren.length) {
          const item = clone(nodes[i]);
          item.children = nextChildren;
          nextNodes.push(item);
          continue;
        }
      }

      if (check(nodes[i])) {
        nextNodes.push(nodes[i]);
      }
    }

    return nextNodes;
  };

  return findNodes(data);
}

/**
 * get all focusable items
 * exclude not visible and disabled node
 * @param filteredData - filtered tree data
 * @param props - TreeProps
 * @param isSearching - component is in Searching
 * @returns
 */
export const getFocusableItems = <TItem extends TreeNodeType>(
  filteredData: TItem[],
  props: Required<
    Pick<PartialTreeProps, 'disabledItemValues' | 'valueKey' | 'childrenKey' | 'expandItemValues'>
  >,
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
export const getActiveIndex = (focusItemValue, focusItems: any[], valueKey) => {
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
 * @param flattenNodes - flattenData
 */
export const getActiveItem = (
  focusItemValue: string | number,
  flattenNodes: TreeNodesType,
  valueKey: string
) => {
  let nodeData: any = null;
  const activeNode = Object.values(flattenNodes).find(node =>
    shallowEqual(node[valueKey], focusItemValue)
  );
  if (activeNode) {
    nodeData = activeNode;
  }

  return nodeData;
};

export const getElementByDataKey = (dataKey: string, treeNodesRefs: any, selector: string) => {
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

export interface FocusPrevOrNextProps {
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

export interface ArrowHandlerProps {
  focusItem: TreeNodeType;
  expand: boolean;
  childrenKey: string;
  onExpand: (focusItem: TreeNodeType) => void;
  onFocusItem: () => void;
}

/**
 * Left arrow keyboard event handler
 * When focus is on an open node, closes the node.
 * When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
 * When focus is on a root node that is also either an end node or a closed node, does nothing.
 * @see https://www.w3.org/TR/wai-aria-practices/#TreeView
 */
export function leftArrowHandler({ focusItem, expand, onExpand, onFocusItem }: ArrowHandlerProps) {
  if (isEmpty(focusItem)) {
    return;
  }

  if (expand) {
    onExpand({ ...focusItem, expand });
  } else if (focusItem?.parent) {
    onFocusItem();
  }
}

/**
 * Right arrow keyboard event handler
 * When focus is on a closed node, opens the node; focus does not move.
 * When focus is on a open node, moves focus to the first child node.
 * When focus is on an end node, does nothing.
 * @see https://www.w3.org/TR/wai-aria-practices/#TreeView
 */
export function rightArrowHandler({
  focusItem,
  expand,
  childrenKey,
  onExpand,
  onFocusItem
}: ArrowHandlerProps) {
  if (isEmpty(focusItem) || !Array.isArray(focusItem[childrenKey])) {
    return;
  }

  if (!expand) {
    onExpand({ ...focusItem, expand });
  } else {
    onFocusItem();
  }
}

/**
 * get scrollIndex in virtualized list
 * @param nodes - data
 * @param value - activeItem value
 * @param valueKey
 */
export const getScrollToIndex = (
  nodes: readonly TreeNodeType[],
  value: string | number,
  valueKey: string
) => nodes.filter(n => n.visible).findIndex(item => item[valueKey] === value);

/**
 * when searching, expand state always return true
 * @param searchKeyword
 * @param expand
 */
export function getExpandWhenSearching(searchKeyword: string, expand: boolean) {
  return isSearching(searchKeyword) ? true : expand;
}

function getTreeActiveNode<T extends number | string | undefined>(
  nodes: TreeNodesType,
  value: T,
  valueKey: string
): T extends undefined ? undefined : TreeNodeType | undefined;
function getTreeActiveNode(nodes, value, valueKey) {
  if (isUndefined(value)) {
    return undefined;
  }
  for (const refKey in nodes) {
    if (shallowEqual(nodes[refKey][valueKey], value)) {
      return nodes[refKey];
    }
  }
}

export { getTreeActiveNode };

/**
 * toggle tree node
 * @param param0
 */
export function toggleExpand<T>({
  node,
  isExpand,
  expandItemValues,
  valueKey
}: ToggleExpandOptions<T>): T[] {
  const newExpandItemValues = new Set<T>(expandItemValues);
  if (isExpand) {
    newExpandItemValues.add(node[valueKey] as T);
  } else {
    newExpandItemValues.delete(node[valueKey] as T);
  }
  return Array.from(newExpandItemValues);
}

type ToggleExpandOptions<T> = {
  node: Record<string, unknown>;
  isExpand: boolean;
  expandItemValues: T[];
  valueKey: string;
};

export function getTreeNodeTitle(label: any) {
  if (typeof label === 'string') {
    return label;
  } else if (React.isValidElement(label)) {
    const nodes = reactToString(label);
    return nodes.join('');
  }
}

/**
 * get all children from flattenNodes object by given parent node
 * @param nodes
 * @param parent
 */
export function getChildrenByFlattenNodes(nodes: TreeNodesType, parent: TreeNodeType) {
  if (!isNil(parent.refKey) && isNil(nodes[parent.refKey])) {
    return [];
  }
  return Object.values(nodes).filter(
    (item: TreeNodeType) =>
      item?.parent?.refKey === parent.refKey && item.refKey && !nodes[item.refKey].uncheckable
  );
}

export function useTreeDrag<T>() {
  // current dragging node
  const dragNode = useRef<T | null>(null);
  const [dragOverNodeKey, setDragOverNodeKey] = useState(null);
  // drag node and it's children nodes key
  const [dragNodeKeys, setDragNodeKeys] = useState<(number | string)[]>([]);
  const [dropNodePosition, setDropNodePosition] = useState<TREE_NODE_DROP_POSITION | null | -1>(
    null
  );

  const setDragNode = (node: T | null) => {
    dragNode.current = node;
  };
  return {
    dragNode: dragNode?.current,
    dragOverNodeKey,
    dragNodeKeys,
    dropNodePosition,
    setDragNode,
    setDragOverNodeKey,
    setDragNodeKeys,
    setDropNodePosition
  };
}

interface FlattenTreeDataProps {
  data: TreeNodeType[];
  labelKey: string;
  valueKey: string;
  childrenKey: string;
  uncheckableItemValues?: any[];
  callback?: (nodes: TreeNodesType) => void;
}

interface UnSerializeListProps {
  nodes: TreeNodesType;
  key: string;
  value: any[];
  cascade: boolean;
  uncheckableItemValues: any[];
}

/**
 * hooks for flatten tree structure
 * @param param0
 */
export function useFlattenTreeData({
  data,
  labelKey,
  valueKey,
  childrenKey,
  uncheckableItemValues = [],
  callback
}: FlattenTreeDataProps) {
  const [, dispatch] = useState(Object.create(null));

  const forceUpdate = useCallback((): void => {
    dispatch(Object.create(null));
  }, [dispatch]);

  const flattenNodes = useRef<TreeNodesType>({});

  const flattenTreeData = useCallback(
    (treeData: TreeNodeType[], parent?: TreeNodeType, layer = 1) => {
      if (!Array.isArray(treeData) || treeData.length === 0) {
        return [];
      }

      treeData.map(node => {
        const value = node[valueKey];
        /**
         * because the value of the node's type is string or number,
         * so it can used as the key of the object directly
         * to avoid number value is converted to string. 1 and '1' will be convert to '1'
         *  we used `String_` or `Number_` prefix
         */
        const refKey = getNodeFormattedRefKey(value);
        node.refKey = refKey;
        flattenNodes.current[refKey] = {
          layer,
          [labelKey]: node[labelKey],
          [valueKey]: node[valueKey],
          uncheckable: uncheckableItemValues.some((value: any) =>
            shallowEqual(node[valueKey], value)
          ),
          ...node
        };
        if (parent) {
          flattenNodes.current[refKey].parent = omit(parent, 'parent', 'children');
        }
        flattenTreeData(node[childrenKey], node, layer + 1);
      });

      callback?.(flattenNodes.current);
    },
    [childrenKey, valueKey, labelKey, callback, uncheckableItemValues]
  );

  const serializeListOnlyParent = useCallback(
    (nodes: TreeNodesType, key: string) => {
      const list: (string | number)[] = [];

      Object.keys(nodes).forEach((refKey: string) => {
        const currentNode = nodes[refKey];
        if (!isNil(currentNode.parent) && !isNil(currentNode.parent.refKey)) {
          const parentNode = nodes[currentNode.parent.refKey];
          if (currentNode[key]) {
            if (!parentNode?.checkAll) {
              list.push(nodes[refKey][valueKey]);
            } else if (parentNode?.uncheckable) {
              list.push(nodes[refKey][valueKey]);
            }
          }
        } else {
          if (currentNode[key]) {
            list.push(nodes[refKey][valueKey]);
          }
        }
      });
      return list;
    },
    [valueKey]
  );

  /**
   * using in CheckTreePicker, to unSerializeList check property
   */
  const unSerializeList = useCallback(
    ({ nodes, key, value = [], cascade, uncheckableItemValues }: UnSerializeListProps) => {
      // Reset values to false
      Object.keys(nodes).forEach((refKey: string) => {
        const node = nodes[refKey];
        if (cascade && !isNil(node.parent) && !isNil(node.parent.refKey)) {
          node[key] = nodes[node.parent.refKey][key];
        } else {
          node[key] = false;
        }
        value.forEach((value: any) => {
          if (
            shallowEqual(nodes[refKey][valueKey], value) &&
            !uncheckableItemValues.some(uncheckableValue => shallowEqual(value, uncheckableValue))
          ) {
            nodes[refKey][key] = true;
          }
        });
      });
    },
    [valueKey]
  );

  const formatVirtualizedTreeData = (
    nodes: TreeNodesType,
    data: any[],
    expandItemValues: unknown[],
    options: {
      cascade?: boolean;
      searchKeyword?: string;
    }
  ): TreeNodeType[] => {
    const { cascade, searchKeyword } = options;
    return UNSAFE_flattenTree(data, childrenKey, (node: any) => {
      let formatted = {};
      const curNode = nodes?.[node.refKey];
      const parentKeys = getNodeParentKeys(nodes, curNode, valueKey);
      /**
       * When using virtualized,
       * if the parent node is collapsed, the child nodes should be hidden
       * avoid component height calculation errors
       */
      let visible = curNode?.parent
        ? shouldShowNodeByParentExpanded(expandItemValues, parentKeys)
        : true;

      /**
       * when searching, every node default expand
       * the node's visible should follow the original state
       */
      if (isSearching(searchKeyword)) {
        visible = node.visible;
      }
      if (curNode) {
        const checkState = !isUndefined(cascade)
          ? getNodeCheckState({ node: curNode, cascade, nodes, childrenKey })
          : undefined;
        formatted = {
          ...node,
          check: curNode.check,
          uncheckable: curNode.uncheckable,
          hasChildren: !!node[childrenKey],
          layer: curNode.layer,
          parent: curNode.parent,
          checkState,
          visible
        };
      }
      return formatted;
    });
  };

  useEffect(() => {
    // when data is changed, should clear the flattenNodes, avoid duplicate keys
    flattenNodes.current = {};
    flattenTreeData(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    forceUpdate,
    flattenNodes: flattenNodes.current,
    flattenTreeData,
    serializeListOnlyParent,
    unSerializeList,
    formatVirtualizedTreeData
  };
}

/**
 * A hook that saving every tree node ref
 */
export function useTreeNodeRefs() {
  const treeNodeRefs = useRef({});

  const saveTreeNodeRef = (ref: React.Ref<any>, refKey?: string) => {
    if (!isNil(refKey)) {
      treeNodeRefs.current[refKey] = ref;
    }
  };

  return {
    treeNodesRefs: treeNodeRefs.current,
    saveTreeNodeRef
  };
}

interface TreeSearchProps<T> {
  labelKey: string;
  childrenKey: string;
  searchKeyword?: string;
  data: T[];
  searchBy?: (keyword, label, item) => boolean;
  callback?: (keyword: string, data: T[], event: React.SyntheticEvent) => void;
}

/**
 * A hook that handles tree search filter options
 * @param props
 */
export function useTreeSearch<T>(props: TreeSearchProps<T>) {
  const { labelKey, childrenKey, searchKeyword, data, searchBy, callback } = props;

  const filterVisibleData = useCallback(
    (data: T[], searchKeyword: string) => {
      const setVisible = (nodes: T[]) =>
        nodes.forEach((item: any) => {
          item.visible = searchBy
            ? searchBy(searchKeyword, item[labelKey], item)
            : shouldDisplay(item[labelKey], searchKeyword);
          if (isArray(item[childrenKey])) {
            filterVisibleData(item[childrenKey], searchKeyword);
            item[childrenKey].forEach((child: any) => {
              if (child.visible) {
                item.visible = child.visible;
              }
            });
          }
        });

      setVisible(data);
      return data;
    },
    [childrenKey, labelKey, searchBy]
  );

  // Use search keywords to filter options.
  const [searchKeywordState, setSearchKeyword] = useState(searchKeyword ?? '');
  const [filteredData, setFilteredData] = useState(() =>
    filterVisibleData(data, searchKeywordState)
  );

  const handleSearch = (searchKeyword: string, event?: React.ChangeEvent) => {
    const filteredData = filterVisibleData(data, searchKeyword);
    setFilteredData(filteredData);
    setSearchKeyword(searchKeyword);
    event && callback?.(searchKeyword, filteredData, event);
  };

  useEffect(() => {
    handleSearch(searchKeyword ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  const handleSetFilteredData = useCallback(
    (data: T[], searchKeyword: string) => {
      setFilteredData(filterVisibleData(data, searchKeyword));
    },
    [filterVisibleData]
  );

  return {
    searchKeywordState,
    filteredData,
    setFilteredData: handleSetFilteredData,
    setSearchKeyword,
    handleSearch
  };
}

export function useGetTreeNodeChildren<T extends Record<string, unknown>>(
  treeData: T[],
  valueKey: string,
  childrenKey: string
) {
  const [loadingNodeValues, setLoadingNodeValues] = useState([]);
  const [data, setData] = useState(treeData);

  const concatChildren = useCallback(
    (treeNode: TreeNodeType, children: any[]): any[] => {
      const value = treeNode[valueKey];
      treeNode = findNodeOfTree(data, item => value === item[valueKey]);
      treeNode[childrenKey] = children;
      const newData = data.concat([]);
      setData(newData);
      return newData;
    },
    [data, valueKey, childrenKey]
  );

  const loadChildren = useCallback(
    (node, getChildren) => {
      setLoadingNodeValues(prev => prev.concat(node[valueKey]));
      const children = getChildren(node);
      if (children instanceof Promise) {
        children.then(res => {
          const newData = concatChildren(node, res);
          setData(newData);
          setLoadingNodeValues(prev => prev.filter(item => !shallowEqual(item, node[valueKey])));
        });
      } else {
        setData(concatChildren(node, children));
        setLoadingNodeValues(prev => prev.filter(item => !shallowEqual(item, node[valueKey])));
      }
    },
    [concatChildren, valueKey]
  );
  return { data, setData, loadingNodeValues, loadChildren };
}

export interface FocusToTreeNodeProps {
  selector: string;
  valueKey: string;
  activeNode: any;
  virtualized: boolean;
  container: HTMLElement | null;
  list: ListHandle;
  formattedNodes: TreeNodeType[];
}

/**
 * Focus to active tree node.
 * @param param0
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

export function isSearching(searchKeyword?: string) {
  return !isEmpty(searchKeyword);
}

export function getTreeNodeIndent(rtl, layer, absolute = false) {
  // layer start from 1
  const offset = layer * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING;

  if (absolute) {
    return {
      [rtl ? 'right' : 'left']: offset
    };
  }

  return {
    [rtl ? 'paddingRight' : 'paddingLeft']: offset
  };
}

/**
 * according to the value type to get the formatted valueKey of the node
 * @param value
 * @returns
 */
export function getNodeFormattedRefKey(value: string | number) {
  return `${typeof value === 'number' ? 'Number_' : 'String_'}${value}`;
}

/**
 * create drag preview when tree node start drag
 * @param name
 * @param className
 * @returns
 */
export function createDragPreview(name: string, className: string) {
  const dragPreview = document.createElement('div');
  dragPreview.id = 'rs-tree-drag-preview';
  dragPreview.innerHTML = name;
  dragPreview.classList.add(className);
  document.body.appendChild(dragPreview);
  return dragPreview;
}

/**
 * remove drag preview when tree node drop
 */
export function removeDragPreview() {
  const dragPreview = document.getElementById('rs-tree-drag-preview');
  dragPreview?.parentNode?.removeChild?.(dragPreview);
}

export function stringifyTreeNodeLabel(label: string | React.ReactNode) {
  if (typeof label === 'string') {
    return label;
  } else if (React.isValidElement(label)) {
    const nodes = reactToString(label);
    return nodes.join('');
  }
  return '';
}

/**
 * Returns a WeakMap that maps each item in `items` to its parent
 * indicated by `getChildren` function
 */
export function getParentMap<T extends Record<string, unknown>>(
  items: readonly T[],
  getChildren: (item: T) => readonly T[] | undefined
) {
  const map = new WeakMap<T, T>();
  for (const queue = [...items]; queue.length > 0; ) {
    const item = queue.shift() as T;
    const children = getChildren(item);

    if (children) {
      for (const child of children) {
        map.set(child, item);
        queue.push(child);
      }
    }
  }

  return map;
}

/**
 * Returns a Map that maps each item's "key", indicated by `getKey` function,
 * to its parent indicated by `getChildren` function
 *
 * NOTICE:
 * Using this function is discouraged.
 * Use {@link getParentMap} whenever possible.
 */
export function getKeyParentMap<T extends Record<string, unknown>, K = React.Key>(
  items: readonly T[],
  getKey: (item: T) => K,
  getChildren: (item: T) => readonly T[] | undefined
) {
  const map = new Map<K, T>();
  for (const queue = [...items]; queue.length > 0; ) {
    const item = queue.shift() as T;
    const children = getChildren(item);

    if (children) {
      for (const child of children) {
        map.set(getKey(child), item);
        queue.push(child);
      }
    }
  }

  return map;
}

/**
 * Returns an array indicating the hierarchy path from root towards `target` item
 */
export function getPathTowardsItem<T>(
  target: T | undefined,
  getParent: (item: T) => T | undefined
) {
  if (!target) return [];

  const path = [target];
  for (let parent = getParent(target); !!parent; parent = getParent(parent)) {
    path.unshift(parent);
  }

  return path;
}
