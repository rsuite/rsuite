import _ from 'lodash';
import { UNSAFE_flattenTree } from '../utils/treeUtils';

const hasSymbol = typeof Symbol === 'function';
export const KEY_GROUP = hasSymbol ? Symbol('_$grouped') : '_$grouped';
export const KEY_GROUP_TITLE = 'groupTitle';

export default function getDataGroupBy(data: any[] = [], key: string, sort?): any[] {
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
