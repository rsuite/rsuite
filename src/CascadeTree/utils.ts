import { ItemDataType } from '../@types/common';
import { getSafeRegExpString } from '../utils';

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

/**
 * Highlight the search keyword in the label
 */
export function highlightLabel<T>(props: {
  item: ItemDataType<T>;
  labelKey: string;
  searchKeyword: string;
  render: (patch: React.ReactNode, index: number) => React.ReactNode;
}) {
  const { item, searchKeyword, labelKey, render } = props;
  const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
  const labelElements: React.ReactNode[] = [];

  const strArr = item[labelKey].split(regx);
  const highStrArr = item[labelKey].match(regx);

  for (let i = 0; i < strArr.length; i++) {
    labelElements.push(strArr[i]);
    if (highStrArr?.[i]) {
      labelElements.push(render(highStrArr[i], i));
    }
  }

  return labelElements;
}
