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

  for (let parent = getParent(pathTarget); parent; parent = getParent(parent)) {
    columns.unshift(getChildren(parent) ?? []);
    path.unshift(parent);
  }

  columns.unshift(items);

  return { columns, path };
}
