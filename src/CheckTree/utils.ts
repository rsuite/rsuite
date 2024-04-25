import { isNil, isUndefined } from 'lodash';
import { CheckTreeProps, ValueType } from './CheckTree';
import { CHECK_STATE, CheckStateType, shallowEqual } from '../utils';
import { formatNodeRefKey } from '../Tree/utils';
import { attachParent } from '../utils/attachParent';
import { TreeNode, TreeNodeMap } from './types';

/**
 * get all children from flattenedNodes object by given parent node
 */
function getChildrenByFlattenNodes(nodes: TreeNodeMap, parent: TreeNode) {
  if (!isNil(parent.refKey) && isNil(nodes[parent.refKey])) {
    return [];
  }
  return Object.values(nodes).filter(
    (item: TreeNode) =>
      item?.parent?.refKey === parent.refKey && item.refKey && !nodes[item.refKey].uncheckable
  );
}

export function isEveryChildChecked(nodes: TreeNodeMap, parent: TreeNode): boolean {
  if (isNil(parent.refKey) || isNil(nodes[parent.refKey])) {
    return false;
  }
  const children = getChildrenByFlattenNodes(nodes, parent);
  if (!children.length) {
    return nodes[parent.refKey].check ?? false;
  }
  return children.every(child => !isNil(child.refKey) && nodes[child.refKey].check);
}

export function isSomeChildChecked(
  nodes: TreeNodeMap,
  parent: TreeNode,
  childrenKey: string
): boolean {
  if (!isNil(parent.refKey) && isNil(nodes[parent.refKey])) {
    return false;
  }
  const children = getChildrenByFlattenNodes(nodes, parent);
  return children.some(child => {
    if (child?.[childrenKey]?.length > 0) {
      return isSomeChildChecked(nodes, child, childrenKey);
    }
    return !isNil(child.refKey) && nodes[child.refKey].check;
  });
}

export function isSomeNodeHasChildren(data: any[], childrenKey: string): boolean {
  return data.some((node: TreeNode) => Array.isArray(node[childrenKey]));
}

/**
 * is all siblings nodes is uncheckable
 * @param {*} node
 */
export function isAllSiblingNodeUncheckable(
  node: TreeNode,
  nodes: TreeNodeMap,
  uncheckableItemValues: (string | number)[],
  valueKey: string
): boolean {
  const list: TreeNode[] = [];
  const parentNodeRefKey = node.parent ? node.parent.refKey : '';

  Object.keys(nodes).forEach((refKey: string) => {
    const curNode = nodes[refKey];
    if (isNil(node.parent) && isNil(curNode.parent)) {
      list.push(curNode);
    } else if (curNode.parent?.refKey === parentNodeRefKey) {
      list.push(curNode);
    }
  });

  return list.every(node => isNodeUncheckable(node, { uncheckableItemValues, valueKey }));
}

/**
 * get each first level node uncheckable state
 */
export function isEveryFirstLevelNodeUncheckable(
  nodes: TreeNodeMap,
  uncheckableItemValues: (string | number)[],
  valueKey: string
) {
  const list: TreeNode[] = [];
  Object.keys(nodes).forEach((refKey: string) => {
    const curNode = nodes[refKey];
    if (!curNode.parent) {
      list.push(curNode);
    }
  });

  return list.every(node => isNodeUncheckable(node, { uncheckableItemValues, valueKey }));
}

/**
 * get node uncheckable state
 * @param {*} node
 */
export function isNodeUncheckable(
  node: any,
  props: Required<Pick<CheckTreeProps, 'uncheckableItemValues' | 'valueKey'>>
) {
  const { uncheckableItemValues = [], valueKey } = props;
  return uncheckableItemValues.some((value: any) => node[valueKey] === value);
}

export function getFormattedTree(
  nodes: TreeNodeMap,
  data: any[],
  props: Required<Pick<CheckTreeProps, 'childrenKey' | 'cascade'>>
) {
  const { childrenKey, cascade } = props;
  return data.map((node: any) => {
    const formatted: any = { ...node };
    const curNode = nodes[node.refKey];
    if (curNode) {
      const checkState = !isUndefined(cascade)
        ? getNodeCheckState({ node: curNode, cascade, nodes, childrenKey })
        : undefined;
      formatted.check = curNode.check;
      formatted.expand = curNode.expand;
      formatted.uncheckable = curNode.uncheckable;
      attachParent(formatted, curNode.parent);
      formatted.checkState = checkState;
      if (node[childrenKey]?.length > 0) {
        formatted[childrenKey] = getFormattedTree(nodes, formatted[childrenKey], props);
      }
    }

    return formatted;
  });
}

export function getDisabledState(
  nodes: TreeNodeMap,
  node: TreeNode,
  props: Required<Pick<CheckTreeProps, 'disabledItemValues' | 'valueKey'>>
) {
  const { disabledItemValues = [], valueKey } = props;
  if (!isNil(node.refKey) && isNil(nodes[node.refKey])) {
    return false;
  }

  return disabledItemValues.some(
    (value: any) => node.refKey && nodes[node.refKey][valueKey] === value
  );
}

export function getCheckTreePickerDefaultValue<T = any>(value: T, uncheckableItemValues: T) {
  if (Array.isArray(value) && Array.isArray(uncheckableItemValues)) {
    return value.filter(v => !uncheckableItemValues.includes(v));
  }

  return [];
}

export function getSelectedItems(nodes: TreeNodeMap, values: ValueType) {
  const checkedItems: TreeNode[] = [];
  values.forEach(value => {
    const refKey = formatNodeRefKey(value);
    const node = nodes[refKey];
    if (!isNil(node)) {
      checkedItems.push(node);
    }
  });
  return checkedItems;
}

export function getNodeCheckState({ nodes, node, cascade, childrenKey }: any): CheckStateType {
  if (isNil(nodes[node.refKey])) {
    return CHECK_STATE.UNCHECK;
  }
  if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
    nodes[node.refKey].checkAll = false;
    return node.check ? CHECK_STATE.CHECK : CHECK_STATE.UNCHECK;
  }

  if (isEveryChildChecked(nodes, node)) {
    nodes[node.refKey].checkAll = true;
    nodes[node.refKey].check = true;
    return CHECK_STATE.CHECK;
  }

  if (isSomeChildChecked(nodes, node, childrenKey)) {
    nodes[node.refKey].checkAll = false;
    return CHECK_STATE.INDETERMINATE;
  }

  return CHECK_STATE.UNCHECK;
}

interface UnserializeListProps {
  nodes: TreeNodeMap;
  key: string;
  value: any;
  valueKey: string;
  cascade?: boolean;
  uncheckableItemValues?: any;
}

/**
 * using in CheckTreePicker, to unserializeList check property
 */
export const unserializeList = (props: UnserializeListProps) => {
  const { nodes, key, value = [], cascade, valueKey, uncheckableItemValues } = props;

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
};
