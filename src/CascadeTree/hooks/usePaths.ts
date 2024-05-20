import { useMemo } from 'react';
import { getPathTowardsItem } from '@/internals/Tree/utils';
import { getColumnsAndPaths } from '../utils';

type UsePathsParams<T> = {
  data: T[];
  /**
   * The item where the focus is on
   */
  activeItem: T | undefined;
  /**
   * The item selected by Cascader's value
   */
  selectedItem: T | undefined;
  getParent: (item: T) => T | undefined;
  getChildren: (item: T) => readonly T[] | undefined;
};

/**
 * A Hook to get the selected path of Tree.
 *
 * - The columns of items to be displayed
 * - The path towards the current focused item
 * - The path towards the current selected item (referred to by Cascader's value)
 *
 */
export function usePaths<T extends Record<string, unknown>>({
  data,
  activeItem,
  selectedItem,
  getParent,
  getChildren
}: UsePathsParams<T>) {
  const pathTowardsSelectedItem = useMemo(
    () => getPathTowardsItem(selectedItem, getParent),
    [getParent, selectedItem]
  );

  const { columns, path: pathTowardsActiveItem } = useMemo(
    () =>
      getColumnsAndPaths(data, activeItem, {
        getParent,
        getChildren
      }),
    [data, activeItem, getParent, getChildren]
  );

  return {
    columns,
    pathTowardsSelectedItem,
    pathTowardsActiveItem
  };
}

export default usePaths;
