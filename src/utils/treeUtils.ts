import * as React from 'react';
import _ from 'lodash';
import { reactToString } from 'rsuite-utils/lib/utils';

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
 * @param {*} childrenKey
 * @param {*} executor
 */
export function flattenTree(
  tree: any[],
  childrenKey: string = 'children',
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
export function getNodeParents(node: object, parentKey: string = 'parent', valueKey?: string) {
  const parents: any[] = [];
  const traverse = (node: any) => {
    if (node && node[parentKey]) {
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
 * 判断当前节点是否显示
 * @param {*} label
 * @param {*} searchKeyword
 */
export function shouldDisplay(label: any, searchKeyword: string) {
  if (!_.trim(searchKeyword)) {
    return true;
  }
  const keyword = searchKeyword.toLocaleLowerCase();
  if (typeof label === 'string') {
    return label.toLocaleLowerCase().indexOf(keyword) >= 0;
  } else if (React.isValidElement(label)) {
    const nodes = reactToString(label);
    return (
      nodes
        .join('')
        .toLocaleLowerCase()
        .indexOf(keyword) >= 0
    );
  }
  return false;
}

/**
 * 获取 VirtualList 的高度
 * @param {*} inline
 * @param {*} height
 */
export function getVirtualLisHeight(inline: boolean, height: number = 0) {
  return inline ? height - MENU_PADDING * 2 : height - SEARCH_BAR_HEIGHT - MENU_PADDING * 2;
}
