import { isNil, isUndefined } from 'lodash';
import { CheckTreeProps, ValueType } from './CheckTree';
import { CHECK_STATE, CheckStateType } from '@/internals/constants';
import { attachParent } from '@/internals/utils';
import { TreeNode, TreeNodeMap } from '@/internals/Tree/types';
import { formatNodeRefKey } from '../Tree/utils';

/**
 * Retrieves the children of a given parent node from a flattened node map.
 * Filters out uncheckable children.
 * Note: Does NOT filter disabled children - disabled children are still considered in check state calculations
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
 * Disabled children are ignored in this check.
 */
export function isEveryChildChecked(
  parent: TreeNode,
  options: {
    nodes: TreeNodeMap;
    childrenKey: string;
    disabledItemValues?: any[];
    valueKey?: string;
  }
): boolean {
  const { nodes, childrenKey, disabledItemValues = [], valueKey = 'value' } = options;
  if (isNil(parent.refKey) || isNil(nodes[parent.refKey])) {
    return false;
  }

  const children = getChildrenByFlattenNodes(nodes, parent);

  if (!children.length) {
    return nodes[parent.refKey].check ?? false;
  }

  // Filter out disabled children
  const enabledChildren = children.filter(child => {
    const isDisabled = getDisabledState(nodes, child, { disabledItemValues, valueKey });
    return !isDisabled;
  });

  // If all children are disabled, return the parent's own check state
  if (enabledChildren.length === 0) {
    return nodes[parent.refKey].check ?? false;
  }

  // Check if all enabled children are checked
  return enabledChildren.every(child => {
    if (child?.[childrenKey]?.length > 0) {
      // fix: #3559
      return isEveryChildChecked(child, { nodes, childrenKey, disabledItemValues, valueKey });
    }

    return !isNil(child.refKey) && nodes[child.refKey].check;
  });
}

/**
 * Checks if any child node is checked.
 * Disabled children are ignored in this check.
 */
export function isSomeChildChecked(
  nodes: TreeNodeMap,
  parent: TreeNode,
  childrenKey: string,
  disabledItemValues: any[] = [],
  valueKey: string = 'value'
): boolean {
  if (!isNil(parent.refKey) && isNil(nodes[parent.refKey])) {
    return false;
  }
  const children = getChildrenByFlattenNodes(nodes, parent);
  return children.some(child => {
    // Skip disabled children
    const isDisabled = getDisabledState(nodes, child, { disabledItemValues, valueKey });
    if (isDisabled) {
      return false; // Disabled children don't count as "some checked"
    }

    if (child?.[childrenKey]?.length > 0) {
      return isSomeChildChecked(nodes, child, childrenKey, disabledItemValues, valueKey);
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
  props: Required<
    Pick<CheckTreeProps, 'childrenKey' | 'cascade' | 'disabledItemValues' | 'valueKey'>
  >
) {
  const { childrenKey, cascade, disabledItemValues = [], valueKey = 'value' } = props;
  return data.map((node: any) => {
    const formatted: any = { ...node };
    const curNode = nodes[node.refKey];

    if (curNode) {
      const checkState = !isUndefined(cascade)
        ? getNodeCheckState(curNode, { cascade, nodes, childrenKey, disabledItemValues, valueKey })
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
 * If a parent node is disabled, all its children should also be disabled.
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

  // Check if the current node is disabled
  const isCurrentNodeDisabled = disabledItemValues.some(
    (value: any) => node.refKey && nodes[node.refKey][valueKey] === value
  );

  if (isCurrentNodeDisabled) {
    return true;
  }

  // Check if any parent node is disabled
  let currentNode = node;
  while (currentNode.parent) {
    const parentNode = currentNode.parent;
    const parentRefKey = parentNode.refKey;
    if (
      !isNil(parentRefKey) &&
      !isNil(nodes[parentRefKey]) &&
      disabledItemValues.some((value: any) => nodes[parentRefKey][valueKey] === value)
    ) {
      return true;
    }
    currentNode = parentNode;
  }

  return false;
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
  disabledItemValues?: any[];
  valueKey?: string;
}

/**
 * Calculates the check state of a node in a check tree.
 */
export function getNodeCheckState(node: TreeNode, options: NodeCheckStateOptions): CheckStateType {
  const { nodes, cascade, childrenKey, disabledItemValues = [], valueKey = 'value' } = options;

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

  if (isEveryChildChecked(node, { nodes, childrenKey, disabledItemValues, valueKey })) {
    nodes[node.refKey].checkAll = true;
    nodes[node.refKey].check = true;

    return CHECK_STATE.CHECK;
  }

  if (isSomeChildChecked(nodes, node, childrenKey, disabledItemValues, valueKey)) {
    nodes[node.refKey].checkAll = false;
    return CHECK_STATE.INDETERMINATE;
  }

  return CHECK_STATE.UNCHECK;
}
