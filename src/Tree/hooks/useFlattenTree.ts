import { useCallback, useRef, useEffect } from 'react';
import omit from 'lodash/omit';
import shallowEqual from '../../utils/shallowEqual';
import { formatNodeRefKey } from '../utils';
import useForceUpdate from './useForceUpdate';
import type { TreeNode, TreeNodeMap } from '../types';

interface UseFlattenTreeOptions {
  /**
   * The key used to access the label property of each tree node.
   */
  labelKey: string;

  /**
   * The key used to access the value property of each tree node.
   */
  valueKey: string;

  /**
   * The key used to access the children property of each tree node.
   */
  childrenKey: string;

  /**
   * Specifies whether the tree should cascade the selection to child nodes.
   */
  cascade?: boolean;

  /**
   * An array of item values that should not be selectable.
   */
  uncheckableItemValues?: any[];

  /**
   * A callback function that will be called when the tree nodes change.
   * It receives a map of the tree nodes.
   */
  callback?: (nodes: TreeNodeMap) => void;
}

/**
 * Custom hook that flattens a tree data structure into a map of nodes.
 *
 */
function useFlattenTree(data: TreeNode[], options: UseFlattenTreeOptions) {
  const { labelKey, valueKey, childrenKey, uncheckableItemValues = [], callback } = options;

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

  useEffect(() => {
    // when data is changed, should clear the flattenedNodes, avoid duplicate keys
    flattenedNodes.current = {};
    flattenTreeData(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return flattenedNodes.current;
}

export default useFlattenTree;
