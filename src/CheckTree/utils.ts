import { isNil, isUndefined } from 'lodash';
import { CheckTreeProps, ValueType } from './CheckTree';
import { CHECK_STATE, CheckStateType } from '@/internals/constants';
import { attachParent } from '@/internals/utils';
import { TreeNode, TreeNodeMap } from '@/internals/Tree/types';
import { formatNodeRefKey } from '../Tree/utils';

/**
 * Retrieves the children of a given parent node from a flattened node map.
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

/**
 * Checks if every child of a given parent node is checked.
 */
export function isEveryChildChecked(
  parent: TreeNode,
  options: { nodes: TreeNodeMap; childrenKey: string }
): boolean {
  const { nodes, childrenKey } = options;
  if (isNil(parent.refKey) || isNil(nodes[parent.refKey])) {
    return false;
  }

  const children = getChildrenByFlattenNodes(nodes, parent);

  if (!children.length) {
    return nodes[parent.refKey].check ?? false;
  }

  return children.every(child => {
    if (child?.[childrenKey]?.length > 0) {
      // fix: #3559
      return isEveryChildChecked(child, { nodes, childrenKey });
    }

    return !isNil(child.refKey) && nodes[child.refKey].check;
  });
}

/**
 * Checks if any child node is checked.
 */
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

/**
 * Checks if any node in the data has a grandchild.
 */
export function hasGrandchild(data: any[], childrenKey: string): boolean {
  return data.some((node: TreeNode) => Array.isArray(node[childrenKey]));
}

/**
 * Checks if all sibling nodes of a given node are uncheckable.
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
 * Checks if every first-level node is uncheckable based on the provided criteria.
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
 * Checks if a node is uncheckable.
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
        ? getNodeCheckState(curNode, { cascade, nodes, childrenKey })
        : undefined;

      formatted.check = curNode.check;
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

/**
 * Determines the disabled state of a tree node.
 */
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

/**
 * Returns the default value for the check tree.
 */
export function getCheckTreeDefaultValue<T = any>(value: T, uncheckableItemValues: T) {
  if (Array.isArray(value) && Array.isArray(uncheckableItemValues)) {
    return value.filter(v => !uncheckableItemValues.includes(v));
  }

  return value;
}

/**
 * Retrieves the selected items from the given nodes.
 */
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

interface NodeCheckStateOptions {
  nodes: TreeNodeMap;
  cascade: boolean;
  childrenKey: string;
}

/**
 * Calculates the check state of a node in a check tree.
 */
export function getNodeCheckState(node: TreeNode, options: NodeCheckStateOptions): CheckStateType {
  const { nodes, cascade, childrenKey } = options;

  if (node.refKey === undefined) {
    return CHECK_STATE.UNCHECK;
  }

  if (isNil(nodes[node.refKey])) {
    return CHECK_STATE.UNCHECK;
  }

  if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
    nodes[node.refKey].checkAll = false;
    return node.check ? CHECK_STATE.CHECK : CHECK_STATE.UNCHECK;
  }

  if (isEveryChildChecked(node, { nodes, childrenKey })) {
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
