import { isNil, isUndefined } from 'lodash';
import { CheckTreePickerProps } from './CheckTreePicker';
import { shallowEqual, CHECK_STATE, CheckStateType } from '../utils';
import { getChildrenByFlattenNodes } from '../utils/treeUtils';

export interface TreeNodeType {
  uncheckable?: boolean;
  refKey?: string;
  check?: boolean;
  parent?: TreeNodeType;
  checkAll?: boolean;
  visible?: boolean;
  expand?: boolean;
  layer?: number;
  showNode?: boolean;
  label?: string | React.ReactNode;
  value?: string | number;
  groupBy?: string;
  children?: TreeNodeType[];
}

export interface TreeNodesType {
  [key: string]: TreeNodeType;
}

export function isEveryChildChecked(nodes: TreeNodesType, parent: TreeNodeType): boolean {
  if (isNil(nodes[parent.refKey])) {
    return false;
  }
  const children = getChildrenByFlattenNodes(nodes, parent);
  if (!children.length) {
    return nodes[parent.refKey].check;
  }
  return children.every(child => nodes[child.refKey].check);
}

export function isSomeChildChecked(nodes: TreeNodesType, parent: TreeNodeType): boolean {
  if (isNil(nodes[parent.refKey])) {
    return false;
  }
  const children = getChildrenByFlattenNodes(nodes, parent);
  if (!children.length) {
    return nodes[parent.refKey].check;
  }
  return children.some(child => nodes[child.refKey].check);
}

export function isSomeNodeHasChildren(data: any[], childrenKey: string): boolean {
  return data.some((node: TreeNodeType) => node[childrenKey]);
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
  const list = [];
  const parentNodeRefkey = node.parent ? node.parent.refKey : '';

  Object.keys(nodes).forEach((refKey: string) => {
    const curNode = nodes[refKey];
    if (isNil(node.parent) && isNil(curNode.parent)) {
      list.push(curNode);
    } else if (curNode.parent?.refKey === parentNodeRefkey) {
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
  const list = [];
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
export function isNodeUncheckable(node: any, props: Partial<CheckTreePickerProps>) {
  const { uncheckableItemValues = [], valueKey } = props;
  return uncheckableItemValues.some((value: any) => shallowEqual(node[valueKey], value));
}

export function getFormattedTree(
  data: any[],
  nodes: TreeNodesType,
  props: Partial<CheckTreePickerProps>
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
      formatted.parent = curNode.parent;
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
  props: Partial<CheckTreePickerProps>
) {
  const { disabledItemValues = [], valueKey } = props;
  if (isNil(nodes[node.refKey])) {
    return false;
  }
  return disabledItemValues.some((value: any) => shallowEqual(nodes[node.refKey][valueKey], value));
}

export function getCheckTreePickerDefaultValue(value: any[], uncheckableItemValues: any[]) {
  if (Array.isArray(value)) {
    return value.filter(v => !uncheckableItemValues.includes(v));
  }

  return [];
}

export function getSelectedItems(
  nodes: TreeNodesType,
  value: (string | number)[],
  valueKey: string
) {
  const checkItems = [];
  Object.keys(nodes).map((refKey: string) => {
    const node = nodes[refKey];
    if (value.some((value: any) => shallowEqual(node[valueKey], value))) {
      checkItems.push(node);
    }
  });
  return checkItems;
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

  if (isSomeChildChecked(nodes, node)) {
    nodes[node.refKey].checkAll = false;
    return CHECK_STATE.INDETERMINATE;
  }

  return CHECK_STATE.UNCHECK;
}
