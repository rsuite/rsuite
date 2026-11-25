import { useEffect } from 'react';
import isFunction from 'lodash/isFunction';
import { useControlled, useEventCallback } from '@/internals/hooks';
import { createConcatChildrenFunction } from '@/internals/Picker';
import { getExpandItemValues, flattenTree } from '../utils';
import type { TreeNode } from '@/internals/Tree/types';

interface DefaultExpandItemValuesOptions {
  valueKey: string;
  defaultExpandAll: boolean;
  childrenKey: string;
  defaultExpandItemValues?: any[];
}
export function getDefaultExpandItemValues<TItem>(
  data: TItem[],
  options: DefaultExpandItemValuesOptions
) {
  const { valueKey, defaultExpandAll, childrenKey, defaultExpandItemValues = [] } = options;

  if (defaultExpandAll) {
    return flattenTree(data, (item: TItem) => item[childrenKey] || [])
      .filter(item => Array.isArray(item[childrenKey]) && item[childrenKey].length > 0)
      .map(item => item[valueKey]);
  }

  return defaultExpandItemValues;
}

interface UseExpandTreeProps<T extends TreeNode> {
  /**
   * Specifies whether all tree nodes should be expanded by default.
   */
  defaultExpandAll: boolean;

  /**
   * The key used to access the value of a tree node.
   */
  valueKey: string;

  /**
   * The key used to access the children of a tree node.
   */
  childrenKey: string;

  /**
   * An array of values that should be expanded by default.
   */
  defaultExpandItemValues: any[];

  /**
   * An optional array of values that control the expanded items.
   */
  controlledExpandItemValues?: any[];

  /**
   * A callback function that is called when the tree is expanded.
   *
   * @param expandItemValues - The expanded item values.
   * @param activeNode - The active tree node.
   * @param concat - A function to concatenate the data and children of a tree node.
   */
  onExpand?: (
    expandItemValues: T[],
    activeNode: T,
    concat: (data: T[], children: T[]) => T[]
  ) => void;

  /**
   * A function that returns the children of a tree node.
   *
   * @param node - The tree node.
   * @returns The children of the tree node.
   */
  getChildren?: (node: T) => T[] | Promise<T[]>;

  /**
   * A function that appends a child to a tree node.
   *
   * @param node - The tree node.
   * @param getChildren - A function that returns the children of a tree node.
   */
  appendChild: (node: T, getChildren: (node: T) => T[] | Promise<T[]>) => void;
}
/**
 * Custom hook for managing tree expansion state.
 */
function useExpandTree(data: TreeNode[], props: UseExpandTreeProps<TreeNode>) {
  const {
    defaultExpandAll,
    valueKey,
    childrenKey,
    defaultExpandItemValues,
    controlledExpandItemValues,
    onExpand,
    getChildren,
    appendChild
  } = props;

  const [expandItemValues, setExpandItemValues] = useControlled(
    controlledExpandItemValues,
    getDefaultExpandItemValues(data, {
      defaultExpandAll,
      valueKey,
      childrenKey,
      defaultExpandItemValues
    })
  );

  useEffect(() => {
    if (Array.isArray(controlledExpandItemValues)) {
      setExpandItemValues(controlledExpandItemValues);
    }
  }, [controlledExpandItemValues, setExpandItemValues]);

  const handleExpandTreeNode = useEventCallback((node: TreeNode, expanded: boolean) => {
    const nextExpandItemValues = getExpandItemValues<TreeNode>({
      node,
      isExpand: !expanded,
      expandItemValues,
      valueKey
    });

    setExpandItemValues(nextExpandItemValues);

    onExpand?.(
      nextExpandItemValues,
      node,
      createConcatChildrenFunction(node, node[valueKey], { valueKey, childrenKey })
    );

    if (
      isFunction(getChildren) &&
      !node.expand &&
      Array.isArray(node[childrenKey]) &&
      node[childrenKey].length === 0
    ) {
      appendChild(node, getChildren);
    }
  });

  return { expandItemValues, handleExpandTreeNode };
}

export default useExpandTree;
