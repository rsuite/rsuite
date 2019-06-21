import _ from 'lodash';

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

export function isEveryChildChecked(node: Node, nodes: Nodes, props: Props) {
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
      if (child[childrenKey] && child[childrenKey].length) {
        return isEveryChildChecked(child, nodes, props);
      }
      return nodes[child.refKey].check;
    });
  }
  return nodes[node.refKey].check;
}

export function isSomeChildChecked(node: Node, nodes: Nodes, props: Props) {
  const { childrenKey } = props;
  if (!node[childrenKey]) {
    return false;
  }

  return node[childrenKey].some(child => {
    if (nodes[child.refKey] && nodes[child.refKey].check) {
      return true;
    }
    return isSomeChildChecked(child, nodes, props);
  });
}

/**
 * 判断第一层节点是否存在有children的节点
 * @param {*} data
 */
export function isSomeNodeHasChildren(data: any[], childrenKey: string) {
  return data.some((node: Node) => node[childrenKey]);
}

/**
 * 获取每个节点的最顶层父节点的check值
 * @param {*} nodes
 * @param {*} node
 */
export function getTopParentNodeCheckState(nodes: Nodes, node: Node) {
  if (node.parentNode) {
    return getTopParentNodeCheckState(nodes, node.parentNode);
  }
  return nodes[node.refKey].check;
}

/**
 * 获取该节点的兄弟节点是否都为 uncheckable
 * @param {*} node
 */
export function getSiblingNodeUncheckable(node: Node, nodes: Nodes) {
  const list = [];
  const parentNodeRefkey = node.parentNode ? node.parentNode.refKey : '';

  Object.keys(nodes).forEach((refKey: string) => {
    const curNode = nodes[refKey];
    if (_.isUndefined(node.parentNode) && _.isUndefined(curNode.parentNode)) {
      list.push(curNode);
    } else if (curNode.parentNode && curNode.parentNode.refKey === parentNodeRefkey) {
      list.push(curNode);
    }
  });

  return list.every(node => node.uncheckable);
}
