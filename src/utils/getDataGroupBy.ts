import _ from 'lodash';
import { UNSAFE_flattenTree, WalkTreeStrategy, flattenTree } from '../utils/treeUtils';

const hasSymbol = typeof Symbol === 'function';
export const KEY_GROUP = hasSymbol ? Symbol('_$grouped') : '_$grouped';
export const KEY_GROUP_TITLE = 'groupTitle';
/**
 * @deprecated This {@link UNSAFE_getDataGroupBy} function is considered unsafe because it uses the unsafe {@link UNSAFE_flattenTree} function
 *             Use {@link getDataGroupBy} instead.
 */
export default function UNSAFE_getDataGroupBy(data: any[] = [], key: string, sort?): any[] {
  const tempData: { [key: string]: any[] } = {};
  const isSort = typeof sort === 'function';

  data.forEach(item => {
    // this will allow getting data using dot notation
    // i.e groupBy="country.name" as country will be a nested object
    // to the item and the name will be nested key to the country object
    // can be used with values in arrays, i.e groupBy="addresses.0.country.name"
    const groupByValue: any = _.get(item, key, '');

    if (!tempData[groupByValue]) {
      tempData[groupByValue] = [];
    }

    tempData[groupByValue].push(item);
  });

  let nextData = Object.entries(tempData).map(([groupTitle, children]: [string, any[]]) => ({
    children: isSort ? children.sort(sort(false)) : children,
    [KEY_GROUP_TITLE]: groupTitle,
    [KEY_GROUP]: true
  }));

  if (isSort) {
    nextData = nextData.sort(sort(true));
  }

  return UNSAFE_flattenTree(nextData);
}

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
