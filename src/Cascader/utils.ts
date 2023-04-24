import { useMemo } from 'react';

type GetColumnsAndPathsOptions<T> = {
  getParent: (item: T) => T | undefined;
  getChildren: (item: T) => readonly T[] | undefined;
};

/**
 * Calculate columns to be displayed:
 *
 * - Every ancestor level of activeItem should be displayed
 * - The level that activeItem is at should be displayed
 * - If activeItem is a parent node, its child level should be displayed
 *
 * @param items
 * @param value
 * @param options
 * @returns
 */
export function getColumnsAndPaths<T extends Record<string, unknown>>(
  items: readonly T[],
  pathTarget: T | undefined,
  options: GetColumnsAndPathsOptions<T>
) {
  const { getParent, getChildren } = options;

  if (!pathTarget) {
    return {
      columns: [items],
      path: []
    };
  }

  const columns: (readonly T[])[] = [];
  const path: T[] = [pathTarget];

  const children = getChildren(pathTarget);

  if (children && children.length > 0) {
    columns.unshift(children);
  }

  for (let parent = getParent(pathTarget); !!parent; parent = getParent(parent)) {
    columns.unshift(getChildren(parent) ?? []);
    path.unshift(parent);
  }

  columns.unshift(items);

  return { columns, path };
}

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
 * Caculate following 3 things
 *
 * - The columns of items to be displayed
 * - The path towards the current focused item
 * - The path towards the current selected item (referred to by Cascader's value)
 *
 * @param params
 * @returns
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

  const { columns: columnsToDisplay, path: pathTowardsActiveItem } = useMemo(
    () =>
      getColumnsAndPaths(data, activeItem, {
        getParent,
        getChildren
      }),
    [data, activeItem, getParent, getChildren]
  );

  return {
    columnsToDisplay,
    pathTowardsSelectedItem,
    pathTowardsActiveItem
  };
}

/**
 * Returns a WeakMap that maps each item in `items` to its parent
 * indicated by `getChildren` function
 */
export function getParentMap<T extends Record<string, unknown>>(
  items: readonly T[],
  getChildren: (item: T) => readonly T[] | undefined
) {
  const map = new WeakMap<T, T>();
  for (const queue = [...items]; queue.length > 0; ) {
    const item = queue.shift() as T;
    const children = getChildren(item);

    if (children) {
      for (const child of children) {
        map.set(child, item);
        queue.push(child);
      }
    }
  }

  return map;
}

/**
 * Returns an array indicating the hirearchy path from root towards `target` item
 */
export function getPathTowardsItem<T>(
  target: T | undefined,
  getParent: (item: T) => T | undefined
) {
  if (!target) return [];

  const path = [target];
  for (let parent = getParent(target); !!parent; parent = getParent(parent)) {
    path.unshift(parent);
  }

  return path;
}
