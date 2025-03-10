import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import useForceUpdate from './useForceUpdate';
import { useCallback, useRef, useEffect } from 'react';
import { shallowEqual } from '@/internals/utils';
import { formatNodeRefKey } from '../utils';
import type { TreeNode, TreeNodeMap } from '@/internals/Tree/types';

interface UseFlattenTreeOptions {
  /**
   * The value of the tree.
   */
  value?: any;

  /**
   * Specifies whether the tree supports multiple selection.
   */
  multiple?: boolean;

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
  const {
    value,
    labelKey,
    valueKey,
    childrenKey,
    uncheckableItemValues = [],
    cascade,
    multiple,
    callback
  } = options;

  const forceUpdate = useForceUpdate();
  const flattenedNodes = useRef<TreeNodeMap>({});
  const seenValues = useRef<Set<any>>(new Set());

  const updateTreeNodeCheckState = useCallback(
    (value = []) => {
      // Reset values to false
      Object.keys(flattenedNodes.current).forEach((refKey: string) => {
        const node = flattenedNodes.current[refKey];
        if (cascade && !isNil(node.parent) && !isNil(node.parent.refKey)) {
          node.check = flattenedNodes.current[node.parent.refKey].check;
        } else {
          node.check = false;
        }

        value.forEach((nodeVal: any) => {
          if (
            shallowEqual(flattenedNodes.current[refKey][valueKey], nodeVal) &&
            !uncheckableItemValues.some(uncheckableValue => shallowEqual(nodeVal, uncheckableValue))
          ) {
            flattenedNodes.current[refKey].check = true;
          }
        });
      });
    },
    [cascade, uncheckableItemValues, valueKey]
  );

  const flattenTreeData = useCallback(
    (treeData: TreeNode[], parent?: TreeNode, layer = 1) => {
      if (!Array.isArray(treeData) || treeData.length === 0) {
        return [];
      }

      treeData.map(node => {
        const value = node[valueKey];

        // Check for duplicate values
        if (seenValues.current.has(value)) {
          console.error(
            `[rsuite] The value '${value}' is duplicated. Each node in the tree data must have a unique value.`
          );
        }
        seenValues.current.add(value);

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
    [callback, forceUpdate, valueKey, labelKey, uncheckableItemValues, childrenKey]
  );

  useEffect(() => {
    // when data is changed, should clear the flattenedNodes, avoid duplicate keys
    flattenedNodes.current = {};
    seenValues.current.clear();
    flattenTreeData(data);
  }, [data]);

  useEffect(() => {
    if (multiple) {
      updateTreeNodeCheckState(value);
      forceUpdate();
    }

    /**
     * Add a dependency on data, because when loading data asynchronously through getChildren,
     * data may change and the node status needs to be updated.
     * @see https://github.com/rsuite/rsuite/issues/3973
     */
  }, [value, data]);

  return flattenedNodes.current;
}

export default useFlattenTree;
