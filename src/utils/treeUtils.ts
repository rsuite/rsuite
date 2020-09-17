import _ from 'lodash';
import shallowEqual from '../utils/shallowEqual';
import shallowEqualArray from '../utils/shallowEqualArray';
import { Node } from '../CheckTreePicker/utils';
import { TREE_NODE_DROP_POSITION } from '../constants';
import { TreePickerProps } from '../TreePicker/TreePicker.d';
import { CheckTreePickerProps } from '../CheckTreePicker/CheckTreePicker.d';

const SEARCH_BAR_HEIGHT = 48;
const MENU_PADDING = 12;
// Tree Node 之间的 间隔
const TREE_NODE_GAP = 4;

/**
 * 判断当前节点是否应该显示
 * @param {*} expandItemValues
 * @param {*} parentKeys
 */
export function shouldShowNodeByExpanded(expandItemValues: any[] = [], parentKeys: any[] = []) {
  const intersectionKeys = _.intersection(expandItemValues, parentKeys);
  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }
  return false;
}

/**
 * 拍平树结构为数组
 * @param {*} tree
 * @param {*} childrenKey
 * @param {*} executor
 */
export function flattenTree(
  tree: any[],
  childrenKey = 'children',
  executor?: (node: object, index: number) => object
) {
  const flattenData: any[] = [];
  const traverse = (data: any[], parent: object | null) => {
    if (!_.isArray(data)) {
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
 * 获取树节点所有的祖先节点
 * @param {*} node
 */
export function getNodeParents(node: object, parentKey = 'parent', valueKey?: string) {
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
 * 获取 VirtualList 的高度
 * @param {*} inline
 * @param {*} height
 */
export function getVirtualLisHeight(inline: boolean, searchable: boolean, height = 0) {
  const searchBarHeight = searchable ? SEARCH_BAR_HEIGHT : 0;
  return inline ? height - MENU_PADDING * 2 : height - searchBarHeight - MENU_PADDING * 2;
}

/**
 * 判断节点是否存在可见的子节点。
 * @param node
 */
export function hasVisibleChildren(node: Node, childrenKey: string) {
  if (!Array.isArray(node[childrenKey])) {
    return false;
  }

  return node[childrenKey].some((child: Node) => child.visible);
}

/**
 * 废弃 prop warning
 * @param prop
 */
export function treeDeprecatedWarning(
  props: CheckTreePickerProps | TreePickerProps,
  keys: string[] = []
) {
  keys.forEach(key => {
    if (!_.isUndefined(props[key])) {
      console.warn(`'Warning: ${key} is deprecated and will be removed in a future release.'`);
    }
  });
}

/**
 * 浅比较两个数组是否不一样
 * @param a
 * @param b
 */
export function compareArray(a: any[], b: any[]) {
  return _.isArray(a) && _.isArray(b) && !shallowEqualArray(a, b);
}

/**
 * 获取 expandAll 的 value
 * @param props
 */
export function getExpandAll(props: TreePickerProps | CheckTreePickerProps) {
  const { expandAll, defaultExpandAll } = props;
  return !_.isUndefined(expandAll) ? expandAll : defaultExpandAll;
}

/**
 * 获取 expandItemValues 的 value
 * @param props
 */
export function getExpandItemValues(props: TreePickerProps | CheckTreePickerProps) {
  const { expandItemValues, defaultExpandItemValues } = props;
  if (!_.isUndefined(expandItemValues) && Array.isArray(expandItemValues)) {
    return expandItemValues;
  }

  if (!_.isUndefined(defaultExpandItemValues) && Array.isArray(defaultExpandItemValues)) {
    return defaultExpandItemValues;
  }
  return [];
}

/**
 * 获取节点展开状态
 * @param node
 * @param props
 */
export function getExpandState(node: any, props: CheckTreePickerProps | TreePickerProps) {
  const { valueKey, childrenKey, expandItemValues } = props;

  const expandAll = getExpandAll(props);
  const expand = getExpandItemValues(props).some((value: any) =>
    shallowEqual(node[valueKey], value)
  );
  if (!_.isUndefined(expandItemValues)) {
    return expand;
  } else if (node[childrenKey]?.length) {
    if (!_.isNil(node.expand)) {
      return !!node.expand;
    } else if (expandAll) {
      return true;
    }
    return false;
  }
  return false;
}

/**
 * 获取拖拽节点及子节点的key
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

  // 处于节点下方
  if (clientY >= bottom - gap && clientY <= bottom) {
    return TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM;
  }

  // 处于节点上方
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
        // 当 children 为空，需要删除 children 属性，不显示角标
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

/**
 * 移动节点valueKey，先删除 dragNode 原本所在的数据，再将 dragNode 移动到拖动的位置
 * @param data
 * @param params
 */
export function createUpdateTreeDataFunction(params: any, { valueKey, childrenKey }) {
  return function(tree: any[]) {
    const data = [...tree];
    const { dragNode, dropNode, dropNodePosition } = params;
    removeDragNode(data, params, { valueKey, childrenKey });
    const updateTree = (items: any[]) => {
      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];

        if (shallowEqual(item[valueKey], dropNode[valueKey])) {
          // 拖拽到 dropNode内，作为 dropNode 的子节点
          if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER) {
            item[childrenKey] = _.isNil(item[childrenKey]) ? [] : item[childrenKey];
            item[childrenKey].push(dragNode);
            break;
          } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_TOP) {
            // 拖拽到 dropNode 的上面
            items.splice(index, 0, dragNode);
            break;
          } else if (dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM) {
            // 拖拽到 dropNode 的下面
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
  const findNode = (nodes = []) => {
    for (let i = 0; i < nodes.length; i += 1) {
      const item = nodes[i];
      if (_.isArray(item.children)) {
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
  const findNodes = (nodes = []) => {
    const nextNodes = [];
    for (let i = 0; i < nodes.length; i += 1) {
      if (_.isArray(nodes[i].children)) {
        const nextChildren = findNodes(nodes[i].children);
        if (nextChildren.length) {
          const item = _.clone(nodes[i]);
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
 * 根据是否处于搜索状态来返回 expand 的值。如果处于搜索状态下，则展开所有的节点
 * @param searchKeyword
 * @param expand
 */
export function getExpandWhenSearching(searchKeyword: string, expand: boolean) {
  return !_.isEmpty(searchKeyword) ? true : expand;
}
