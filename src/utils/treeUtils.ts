import React, { useRef, useState, useEffect, useCallback } from 'react';
import { intersection, isUndefined, omit, isArray, isNil, clone, isEmpty } from 'lodash';
import shallowEqualArray from '../utils/shallowEqualArray';
import { TreeNodeType, TreeNodesType, getNodeCheckState } from '../CheckTreePicker/utils';
import { TREE_NODE_DROP_POSITION, shallowEqual } from '../utils';
import { CheckTreePickerProps } from '../CheckTreePicker/CheckTreePicker';
import { ItemDataType } from '../@types/common';
import { TreePickerProps } from '../TreePicker/TreePicker';
import { shouldDisplay } from '../Picker';
import reactToString from './reactToString';
import { ListInstance } from '../Picker/VirtualizedList';

type PartialTreeProps = Partial<TreePickerProps | CheckTreePickerProps>;

// gap of tree node
const TREE_NODE_GAP = 4;

/**
 * according node parentNode expand state decide node whether to show
 * @param {*} expandItemValues
 * @param {*} parentKeys
 */
export function shouldShowNodeByParentExpanded(
  expandItemValues: any[] = [],
  parentKeys: any[] = []
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
 */
export function flattenTree(
  tree: any[],
  childrenKey = 'children',
  executor?: (node: any, index: number) => any
) {
  const flattenData: any[] = [];
  const traverse = (data: any[], parent: any | null) => {
    if (!isArray(data)) {
      return;
    }

    data.forEach((item: any, index: number) => {
      const node: any = typeof executor === 'function' ? executor(item, index) : item;
      node.parent = parent;

      flattenData.push({ ...node });

      if (item[childrenKey]) {
        traverse(item[childrenKey], item);
      }
    });
  };

  traverse(tree, null);
  return flattenData;
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
export function getNodeParentKeys(nodes: TreeNodesType, node: TreeNodeType, valueKey: string) {
  const parentKeys: TreeNodeType[] = [];
  const traverse = (node: TreeNodeType) => {
    if (node?.parent) {
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

export function getDefaultExpandItemValues(
  data: ItemDataType[],
  props: Pick<
    TreePickerProps,
    'defaultExpandAll' | 'valueKey' | 'childrenKey' | 'defaultExpandItemValues'
  >
) {
  const { valueKey, defaultExpandAll, childrenKey, defaultExpandItemValues = [] } = props;
  if (defaultExpandAll) {
    return flattenTree(data, childrenKey)
      .filter(item => Array.isArray(item[childrenKey!]) && item[childrenKey!].length > 0)
      .map(item => item[valueKey!]);
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
    removeDragNode(data, params, { valueKey, childrenKey });
    const updateTree = (items: any[]) => {
      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];

        if (shallowEqual(item[valueKey], dropNode[valueKey])) {
          // drag to node inside
          if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER) {
            item[childrenKey] = isNil(item[childrenKey]) ? [] : item[childrenKey];
            item[childrenKey].push(dragNode);
            break;
          } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_TOP) {
            // drag to top of node
            items.splice(index, 0, dragNode);
            break;
          } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM) {
            // drag to bottom of node
            items.splice(index + 1, 0, dragNode);
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

export function filterNodesOfTree(data, check) {
  const findNodes = (nodes: readonly TreeNodeType[] = []) => {
    const nextNodes: TreeNodeType[] = [];
    for (let i = 0; i < nodes.length; i += 1) {
      if (isArray(nodes[i].children)) {
        const nextChildren = findNodes(nodes[i].children);
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
export const getFocusableItems = (
  filteredData: ItemDataType[],
  props: PartialTreeProps,
  isSearching?: boolean
) => {
  const { disabledItemValues, valueKey, childrenKey, expandItemValues } = props;
  const items: TreeNodeType[] = [];
  const loop = (nodes: any[]) => {
    nodes.forEach((node: any) => {
      const disabled = disabledItemValues!.some(disabledItem =>
        shallowEqual(disabledItem, node[valueKey!])
      );
      if (!disabled && node.visible) {
        items.push(node);
      }
      // always expand when searching
      const expand = isSearching ? true : expandItemValues!.includes(node[valueKey!]);
      if (node[childrenKey!] && expand) {
        loop(node[childrenKey!]);
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
  focusItemValue: string | number;
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
export function toggleExpand({ node, isExpand, expandItemValues, valueKey }: any) {
  const newExpandItemValues = new Set(expandItemValues);
  if (isExpand) {
    newExpandItemValues.add(node[valueKey]);
  } else {
    newExpandItemValues.delete(node[valueKey]);
  }
  return Array.from(newExpandItemValues);
}

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
  if (isNil(nodes[parent.refKey])) {
    return [];
  }
  return Object.values(nodes).filter(
    (item: TreeNodeType) =>
      item?.parent?.refKey === parent.refKey && !nodes[item.refKey].uncheckable
  );
}

export function useTreeDrag() {
  // current dragging node
  const dragNode = useRef<ItemDataType | null>(null);
  const [dragOverNodeKey, setDragOverNodeKey] = useState(null);
  // drag node and it's children nodes key
  const [dragNodeKeys, setDragNodeKeys] = useState([]);
  const [dropNodePosition, setDropNodePosition] = useState<TREE_NODE_DROP_POSITION | null>(null);

  const setDragNode = (node: ItemDataType | null) => {
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

  const { current: flattenNodes = {} } = useRef<TreeNodesType>({});

  const flattenTreeData = useCallback(
    (treeData: TreeNodeType[], ref: string, parent?: TreeNodeType, layer = 1) => {
      if (!Array.isArray(treeData) || treeData.length === 0) {
        return [];
      }

      treeData.map((node, index) => {
        const refKey = `${ref}-${index}`;

        node.refKey = refKey;

        flattenNodes[refKey] = {
          layer,
          [labelKey]: node[labelKey],
          [valueKey]: node[valueKey],
          uncheckable: uncheckableItemValues.some((value: any) =>
            shallowEqual(node[valueKey], value)
          ),
          ...node
        };
        if (parent) {
          flattenNodes[refKey].parent = omit(parent, 'parent', 'children');
        }
        flattenTreeData(node[childrenKey], refKey, node, layer + 1);
      });

      callback?.(flattenNodes);
    },
    [childrenKey, valueKey, labelKey, callback, uncheckableItemValues, flattenNodes]
  );

  const serializeListOnlyParent = useCallback(
    (nodes: TreeNodesType, key: string) => {
      const list: TreeNodeType[] = [];

      Object.keys(nodes).forEach((refKey: string) => {
        const currentNode = nodes[refKey];
        if (currentNode.parent) {
          const parentNode = nodes[currentNode.parent?.refKey];
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
        if (cascade && node.parent) {
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
    expandItemValues: ItemDataType[],
    options: {
      cascade?: boolean;
      searchKeyword?: string;
    }
  ) => {
    const { cascade, searchKeyword } = options;
    return flattenTree(data, childrenKey, (node: any) => {
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
    flattenTreeData(data, '0');
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    forceUpdate,
    flattenNodes,
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

  const saveTreeNodeRef = (refKey: string, ref: React.Ref<any>) => {
    if (refKey) {
      treeNodeRefs.current[refKey] = ref;
    }
  };

  return {
    treeNodesRefs: treeNodeRefs.current,
    saveTreeNodeRef
  };
}

interface TreeSearchProps {
  labelKey: string;
  childrenKey: string;
  searchKeyword?: string;
  data: ItemDataType[];
  searchBy?: (keyword, label, item) => boolean;
  callback?: (keyword: string, data: ItemDataType[], event: React.SyntheticEvent) => void;
}

/**
 * A hook that handles tree search filter options
 * @param props
 */
export function useTreeSearch<T extends HTMLElement = HTMLInputElement>(props: TreeSearchProps) {
  const { labelKey, childrenKey, searchKeyword, data, searchBy, callback } = props;

  const filterVisibleData = useCallback(
    (data: ItemDataType[], searchKeyword: string) => {
      const setVisible = (nodes: ItemDataType[]) =>
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
  const [searchKeywordState, setSearchKeyword] = useState(() => searchKeyword ?? '');
  const [filteredData, setFilteredData] = useState(() =>
    filterVisibleData(data, searchKeywordState)
  );

  const handleSetFilteredData = useCallback(
    (data: ItemDataType[], searchKeyword: string) => {
      setFilteredData(filterVisibleData(data, searchKeyword));
    },
    [filterVisibleData]
  );

  const handleSearch = (searchKeyword: string, event: React.ChangeEvent<T>) => {
    const filteredData = filterVisibleData(data, searchKeyword);
    setFilteredData(filteredData);
    setSearchKeyword(searchKeyword);
    callback?.(searchKeyword, filteredData, event);
  };

  return {
    searchKeywordState,
    filteredData,
    setFilteredData: handleSetFilteredData,
    setSearchKeyword,
    handleSearch
  };
}

export function useGetTreeNodeChildren(
  treeData: ItemDataType[],
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
  container: HTMLDivElement;
  list: ListInstance;
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
