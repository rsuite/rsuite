import { useState, useCallback, useEffect } from 'react';
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
  const [loadingNodeValues, setLoadingNodeValues] = useState([]);
  const [tree, setTree] = useState({ data, source: data });
  const setTreeData = useCallback((nextData: T[], source: T[], preserveOwner = false) => {
    setTree(previous => {
      // Async children still belong to an owner that only copied the root array.
      const owner =
        preserveOwner &&
        previous.source.length === source.length &&
        previous.source.every((node, index) => node === source[index])
          ? previous.source
          : source;
      return previous.data === nextData && previous.source === owner
        ? previous
        : { data: nextData, source: owner };
    });
  }, []);

  useEffect(() => {
    setTreeData(data, data);
  }, [data, setTreeData]);

  const concatChildren = useCallback(
    (treeNode: TreeNode, children: any[]): any[] => {
      const value = treeNode[valueKey];
      treeNode = findNodeOfTree(data, item => value === item[valueKey]);
      treeNode[childrenKey] = children;
      const newData = data.concat([]);
      setTreeData(newData, data, true);
      return newData;
    },
    [data, valueKey, childrenKey, setTreeData]
  );

  const appendChild = useCallback(
    (node, getChildren) => {
      setLoadingNodeValues(prev => prev.concat(node[valueKey]));
      const children = getChildren(node);

      if (children instanceof Promise) {
        children.then(res => {
          const newData = concatChildren(node, res);
          setTreeData(newData, data, true);
          setLoadingNodeValues(prev => prev.filter(item => !shallowEqual(item, node[valueKey])));
        });
      } else {
        setTreeData(concatChildren(node, children), data, true);
        setLoadingNodeValues(prev => prev.filter(item => !shallowEqual(item, node[valueKey])));
      }
    },
    [concatChildren, valueKey, data, setTreeData]
  );
  return { treeData: tree.data, treeDataSource: tree.source, loadingNodeValues, appendChild };
}
