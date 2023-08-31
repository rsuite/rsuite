import _ from 'lodash';
import { WalkTreeStrategy, flattenTree } from '../utils/treeUtils';

const hasSymbol = typeof Symbol === 'function';
export const KEY_GROUP = hasSymbol ? Symbol('_$grouped') : '_$grouped';
export const KEY_GROUP_TITLE = 'groupTitle';

/**
 * Chunk data into groups
 * @returns [group, child, child, group, child, child]
 */
export function getDataGroupBy<T>(
  data: readonly T[],
  key: string,
  sort?: (isGroup: boolean) => <T>(a: T, b: T) => number
): (T | { groupTitle: string; children: T[] })[] {
  const groupMap = _.groupBy(data, key);
  const isSort = typeof sort === 'function';

  const groups = Object.entries(groupMap).map(([groupTitle, children]: [string, any[]]) => ({
    children: isSort ? children.sort(sort(false)) : children,
    [KEY_GROUP_TITLE]: groupTitle,
    [KEY_GROUP]: true
  }));

  if (isSort) {
    groups.sort(sort(true));
  }

  // Use DFS traverse
  // Because I want the result to be [group, child, child, group, child, child]
  // rather than [group, group, child, child, child, child]
  return flattenTree(groups, group => group.children, WalkTreeStrategy.DFS);
}

/**
 * Chunk options into groups
 * @returns [
 *   group {
 *     key
 *     options
 *   }
 *   group {
 *     key
 *     options
 *   }
 * ]
 */
export type Group<T> = { key: string; options: T[] };
export type CompareFn<T> = (a: T, b: T) => number;
export function groupOptions<T>(
  options: readonly T[],
  groupKey: string,
  compareOptions?: CompareFn<T>,
  compareGroups?: CompareFn<Group<T>>
): Group<T>[] {
  const groupMap = _.groupBy(options, groupKey);
  const groups = Object.entries(groupMap).map(([key, options]) => ({
    key,
    options: typeof compareOptions === 'function' ? options.sort(compareOptions) : options
  }));

  return typeof compareGroups === 'function' ? groups.sort(compareGroups) : groups;
}
