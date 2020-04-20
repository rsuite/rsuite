import _ from 'lodash';
import shallowEqual from '../utils/shallowEqual';
import { CheckTreePickerProps } from './CheckTreePicker.d';

interface Props {
  childrenKey?: string;
}

export interface Node {
  uncheckable?: boolean;
  refKey?: string;
  check?: boolean;
  parentNode?: Node;
  checkAll?: boolean;
  visible?: boolean;
  expand?: boolean;
}

export interface Nodes {
  [key: string]: Node;
}

export function isEveryChildChecked(node: Node, nodes: Nodes, props: Props): boolean {
  const { childrenKey } = props;
  let children = null;
  if (node[childrenKey]) {
    children = node[childrenKey].filter(
      child => nodes[child.refKey] && !nodes[child.refKey].uncheckable
    );
    if (!children.length) {
      return nodes[node.refKey].check;
    }
    return children.every(child => {
      if (child[childrenKey]?.length) {
        return isEveryChildChecked(child, nodes, props);
      }
      return nodes[child.refKey].check;
    });
  }
  return nodes[node.refKey].check;
}

export function isSomeChildChecked(node: Node, nodes: Nodes, props: Props): boolean {
  const { childrenKey } = props;
  if (!node[childrenKey]) {
    return false;
  }

  return node[childrenKey].some(child => {
    if (nodes[child.refKey]?.check) {
      return true;
    }
    return isSomeChildChecked(child, nodes, props);
  });
}

/**
 * 判断第一层节点是否存在有children的节点
 * @param {*} data
 */
export function isSomeNodeHasChildren(data: any[], childrenKey: string): boolean {
  return data.some((node: Node) => node[childrenKey]);
}

/**
 * 获取该节点的兄弟节点是否都为 uncheckable
 * @param {*} node
 */
export function getSiblingNodeUncheckable(node: Node, nodes: Nodes): boolean {
  const list = [];
  const parentNodeRefkey = node.parentNode ? node.parentNode.refKey : '';

  Object.keys(nodes).forEach((refKey: string) => {
    const curNode = nodes[refKey];
    if (_.isUndefined(node.parentNode) && _.isUndefined(curNode.parentNode)) {
      list.push(curNode);
    } else if (curNode.parentNode?.refKey === parentNodeRefkey) {
      list.push(curNode);
    }
  });

  return list.every(node => node.uncheckable);
}

/**
 * 获取第一层节点是否全部都为 uncheckable
 */
export function getEveryFisrtLevelNodeUncheckable(nodes: Nodes) {
  const list = [];
  Object.keys(nodes).forEach((refKey: string) => {
    const curNode = nodes[refKey];
    if (!curNode.parentNode) {
      list.push(curNode);
    }
  });

  return list.every(node => node.uncheckable);
}

/**
 * 获取节点的是否需要隐藏checkbox
 * @param {*} node
 */
export function getUncheckableState(node: any, props: CheckTreePickerProps) {
  const { uncheckableItemValues = [], valueKey } = props;
  return uncheckableItemValues.some((value: any) => shallowEqual(node[valueKey], value));
}

/**
 * 获取格式化后的树
 * @param data
 * @param nodes
 * @param props
 */
export function getFormattedTree(data: any[], nodes: Nodes, props: CheckTreePickerProps) {
  const { childrenKey } = props;
  return data.map((node: any) => {
    const formatted: any = { ...node };
    const curNode = nodes[node.refKey];
    if (curNode) {
      formatted.check = curNode.check;
      formatted.expand = curNode.expand;
      formatted.uncheckable = curNode.uncheckable;
      formatted.parentNode = curNode.parentNode;
      if (node[childrenKey]?.length > 0) {
        formatted[childrenKey] = getFormattedTree(formatted[childrenKey], nodes, props);
      }
    }

    return formatted;
  });
}

/**
 * 获取每个节点的disable状态
 * @param {*} node
 */
export function getDisabledState(nodes: Nodes, node: Node, props: CheckTreePickerProps) {
  const { disabledItemValues = [], valueKey } = props;
  return disabledItemValues.some((value: any) => shallowEqual(nodes[node.refKey][valueKey], value));
}
