//@flow
import _ from 'lodash';

const SEARCH_BAR_HEIGHT = 48;
const MENU_PADDING = 12;

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
 * @param {*} executor
 * @param {*} props
 */
export function flattenTree(
  tree: any[],
  executor: (node: Object, index: number) => Object,
  props: Object
) {
  const { childrenKey } = props;

  const flattenData = [];
  const traverse = (data: any[]) => {
    data.forEach((d: Object, index: number) => {
      const node = executor(d, index);
      flattenData.push({ ...node });
      if (d[childrenKey]) {
        traverse(d[childrenKey]);
      }
    });
  };

  traverse(tree);
  return flattenData;
}

/**
 * 获取当前节点所有的祖先节点
 * @param {*} node
 */
export function getNodeParentKeys(node: Object, props: Object) {
  const { valueKey } = props;
  const parentKeys = [];
  const traverse = (node: Object) => {
    if (node && node.parentNode) {
      traverse(node.parentNode);
      parentKeys.push(node.parentNode[valueKey]);
    }
  };

  traverse(node);
  return parentKeys;
}

/**
 * 获取 VirtualList 的高度
 * @param {*} inline
 * @param {*} height
 */
export function getVirtualLisHeight(inline: boolean, height: number) {
  return inline ? height - MENU_PADDING * 2 : height - SEARCH_BAR_HEIGHT - MENU_PADDING * 2;
}
