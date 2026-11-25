import { useState, useEffect } from 'react';
import { useEventCallback } from '@/internals/hooks';
import { shallowEqual } from '@/internals/utils';
import { findNodeOfTree } from '@/internals/Tree/utils';
import type { TreeNode } from '@/internals/Tree/types';

interface UseTreeWithChildrenOptions {
  valueKey: string;
  childrenKey: string;
}

/**
 * Custom hook that provides functionality for managing a tree structure with children.
 */
export default function useTreeWithChildren<T extends TreeNode>(
  data: T[],
  options: UseTreeWithChildrenOptions
) {
  const { valueKey, childrenKey } = options;
  const [loadingNodeValues, setLoadingNodeValues] = useState<NonNullable<TreeNode['value']>[]>([]);
  const [tree, setTree] = useState({ data, source: data });

  useEffect(() => {
    setTree(previous => (previous.source === data ? previous : { data, source: data }));
  }, [data]);

  const applyChildren = useEventCallback(
    (parent: TreeNode, originalChildren: unknown, originalChildrenKey: string, children: T[]) => {
      // A copied root array still owns the request if it contains the same parent.
      if (
        childrenKey !== originalChildrenKey ||
        parent[childrenKey] !== originalChildren ||
        !findNodeOfTree(data, item => item === parent, childrenKey)
      ) {
        return;
      }

      parent[childrenKey] = children;
      setTree({ data: [...data], source: data });
    }
  );

  const appendChild = useEventCallback((node: T, getChildren: (node: T) => T[] | Promise<T[]>) => {
    const value = node[valueKey];
    const parent = findNodeOfTree(data, item => item[valueKey] === value, childrenKey);
    if (!parent) return;

    const originalChildren = parent[childrenKey];
    setLoadingNodeValues(previous => [...previous, value]);

    const finish = (children: T[]) => {
      applyChildren(parent, originalChildren, childrenKey, children);
      setLoadingNodeValues(previous => {
        const entry = previous.findIndex(item => shallowEqual(item, value));
        return previous.filter((_, index) => index !== entry);
      });
    };

    const children = getChildren(node);
    if (children instanceof Promise) {
      children.then(finish);
    } else {
      finish(children);
    }
  });

  return { treeData: tree.data, treeDataSource: tree.source, loadingNodeValues, appendChild };
}
