import _ from 'lodash';
import { WalkTreeStrategy, flattenTree } from '../../Tree/utils';
import { RSUITE_PICKER_GROUP_KEY } from '@/internals/symbols';

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
    [RSUITE_PICKER_GROUP_KEY]: true
  }));

  if (isSort) {
    groups.sort(sort(true));
  }

  // Use DFS traverse
  // Because I want the result to be [group, child, child, group, child, child]
  // rather than [group, group, child, child, child, child]
  return flattenTree(groups, group => group.children, WalkTreeStrategy.DFS);
}

export default getDataGroupBy;
