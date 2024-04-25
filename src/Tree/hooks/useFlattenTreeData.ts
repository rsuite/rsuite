import { useCallback, useRef, useEffect } from 'react';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import shallowEqual from '../../utils/shallowEqual';
import {
  shouldShowNodeByParentExpanded,
  isSearching,
  getNodeParentKeys,
  formatNodeRefKey,
  UNSAFE_flattenTree
} from '../utils';
import { getNodeCheckState } from '../../CheckTree/utils';
import useForceUpdate from './useForceUpdate';
import type { TreeNode, TreeNodeMap } from '../types';

interface UseFlattenTreeDataProps {
  data: TreeNode[];
  labelKey: string;
  valueKey: string;
  childrenKey: string;
  cascade?: boolean;
  uncheckableItemValues?: any[];
  callback?: (nodes: TreeNodeMap) => void;
}

interface UnserializeListProps {
  nodes: TreeNodeMap;
  key: string;
  value: any;
}

/**
 * hooks for flatten tree structure
 */
function useFlattenTreeData({
  data,
  labelKey,
  valueKey,
  childrenKey,
  uncheckableItemValues = [],
  cascade,
  callback
}: UseFlattenTreeDataProps) {
  const forceUpdate = useForceUpdate();

  const flattenedNodes = useRef<TreeNodeMap>({});

  const flattenTreeData = useCallback(
    (treeData: TreeNode[], parent?: TreeNode, layer = 1) => {
      if (!Array.isArray(treeData) || treeData.length === 0) {
        return [];
      }

      treeData.map(node => {
        const value = node[valueKey];
        /**
         * because the value of the node's type is string or number,
         * so it can used as the key of the object directly
         * to avoid number value is converted to string. 1 and '1' will be convert to '1'
         *  we used `String_` or `Number_` prefix
         */
        const refKey = formatNodeRefKey(value);
        node.refKey = refKey;
        flattenedNodes.current[refKey] = {
          layer,
          [labelKey]: node[labelKey],
          [valueKey]: node[valueKey],
          uncheckable: uncheckableItemValues.some((value: any) =>
            shallowEqual(node[valueKey], value)
          ),
          ...node
        };
        if (parent) {
          flattenedNodes.current[refKey].parent = omit(parent, 'parent', 'children');
        }
        flattenTreeData(node[childrenKey], node, layer + 1);
      });

      callback?.(flattenedNodes.current);
      forceUpdate();
    },
    [callback, uncheckableItemValues, forceUpdate, valueKey, labelKey, childrenKey]
  );

  const serializeListOnlyParent = useCallback(
    (nodes: TreeNodeMap, key: string) => {
      const list: (string | number)[] = [];

      Object.keys(nodes).forEach((refKey: string) => {
        const currentNode = nodes[refKey];
        if (!isNil(currentNode.parent) && !isNil(currentNode.parent.refKey)) {
          const parentNode = nodes[currentNode.parent.refKey];
          if (currentNode[key]) {
            if (!parentNode?.checkAll) {
              list.push(nodes[refKey][valueKey]);
            } else if (parentNode?.uncheckable) {
              list.push(nodes[refKey][valueKey]);
            }
          }
        } else {
          if (currentNode[key]) {
            list.push(nodes[refKey][valueKey]);
          }
        }
      });
      return list;
    },
    [valueKey]
  );

  /**
   * using in CheckTreePicker, to unserializeList check property
   */
  const unserializeList = useCallback(
    ({ nodes, key, value = [] }: UnserializeListProps) => {
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
    },
    [cascade, uncheckableItemValues, valueKey]
  );

  const formatVirtualizedTreeData = (
    nodes: TreeNodeMap,
    data: any[],
    expandItemValues: unknown[],
    options: {
      cascade?: boolean;
      searchKeyword?: string;
    }
  ): TreeNode[] => {
    const { cascade, searchKeyword } = options;
    return UNSAFE_flattenTree(data, childrenKey, (node: any) => {
      let formatted = {};
      const curNode = nodes?.[node.refKey];
      const parentKeys = getNodeParentKeys(nodes, curNode, valueKey);
      /**
       * When using virtualized,
       * if the parent node is collapsed, the child nodes should be hidden
       * avoid component height calculation errors
       */
      let visible = curNode?.parent
        ? shouldShowNodeByParentExpanded(expandItemValues, parentKeys)
        : true;

      /**
       * when searching, every node default expand
       * the node's visible should follow the original state
       */
      if (isSearching(searchKeyword)) {
        visible = node.visible;
      }
      if (curNode) {
        const checkState = !isUndefined(cascade)
          ? getNodeCheckState({ node: curNode, cascade, nodes, childrenKey })
          : undefined;
        formatted = {
          ...node,
          check: curNode.check,
          uncheckable: curNode.uncheckable,
          hasChildren: !!node[childrenKey],
          layer: curNode.layer,
          parent: curNode.parent,
          checkState,
          visible
        };
      }
      return formatted;
    });
  };

  useEffect(() => {
    // when data is changed, should clear the flattenedNodes, avoid duplicate keys
    flattenedNodes.current = {};
    flattenTreeData(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    forceUpdate,
    flattenedNodes: flattenedNodes.current,
    flattenTreeData,
    serializeListOnlyParent,
    unserializeList,
    formatVirtualizedTreeData
  };
}

export default useFlattenTreeData;
