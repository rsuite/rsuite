import _ from 'lodash';
import { WalkTreeStrategy, flattenTree } from '../utils/treeUtils';

const hasSymbol = typeof Symbol === 'function';
export const KEY_GROUP = hasSymbol ? Symbol('_$grouped') : '_$grouped';
export const KEY_GROUP_TITLE = 'groupTitle';

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
