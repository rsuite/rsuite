import { isNil, isUndefined } from 'lodash';
import { CheckTreePickerProps, ValueType } from './CheckTreePicker';
import { CHECK_STATE, CheckStateType } from '../utils';
import { getChildrenByFlattenNodes, getNodeFormattedRefKey } from '../utils/treeUtils';
import { attachParent } from '../utils/attachParent';

export interface TreeNodeType {
  uncheckable?: boolean;
  refKey?: string;
  check?: boolean;
  parent?: TreeNodeType;
  checkAll?: boolean;
  visible?: boolean;
  expand?: boolean;
  layer?: number;
  label?: string | React.ReactNode;
  value?: string | number;
  groupBy?: string;
  children?: TreeNodeType[];
  hasChildren?: boolean;
  checkState?: CheckStateType;
}

export interface TreeNodesType {
  [key: string]: TreeNodeType;
}

export function isEveryChildChecked(nodes: TreeNodesType, parent: TreeNodeType): boolean {
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
  nodes: TreeNodesType,
  parent: TreeNodeType,
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
  return data.some((node: TreeNodeType) => Array.isArray(node[childrenKey]));
}

/**
 * is all siblings nodes is uncheckable
 * @param {*} node
 */
export function isAllSiblingNodeUncheckable(
  node: TreeNodeType,
  nodes: TreeNodesType,
  uncheckableItemValues: (string | number)[],
  valueKey: string
): boolean {
  const list: TreeNodeType[] = [];
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
  nodes: TreeNodesType,
  uncheckableItemValues: (string | number)[],
  valueKey: string
) {
  const list: TreeNodeType[] = [];
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
  props: Required<Pick<CheckTreePickerProps, 'uncheckableItemValues' | 'valueKey'>>
) {
  const { uncheckableItemValues = [], valueKey } = props;
  return uncheckableItemValues.some((value: any) => node[valueKey] === value);
}

export function getFormattedTree(
  data: any[],
  nodes: TreeNodesType,
  props: Required<Pick<CheckTreePickerProps, 'childrenKey' | 'cascade'>>
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
        formatted[childrenKey] = getFormattedTree(formatted[childrenKey], nodes, props);
      }
    }

    return formatted;
  });
}

export function getDisabledState(
  nodes: TreeNodesType,
  node: TreeNodeType,
  props: Required<Pick<CheckTreePickerProps, 'disabledItemValues' | 'valueKey'>>
) {
  const { disabledItemValues = [], valueKey } = props;
  if (!isNil(node.refKey) && isNil(nodes[node.refKey])) {
    return false;
  }

  return disabledItemValues.some(
    (value: any) => node.refKey && nodes[node.refKey][valueKey] === value
  );
}

export function getCheckTreePickerDefaultValue(value: any[], uncheckableItemValues: any[]) {
  if (Array.isArray(value)) {
    return value.filter(v => !uncheckableItemValues.includes(v));
  }

  return [];
}

export function getSelectedItems(nodes: TreeNodesType, values: ValueType) {
  const checkedItems: TreeNodeType[] = [];
  values.forEach(value => {
    const refKey = getNodeFormattedRefKey(value);
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
