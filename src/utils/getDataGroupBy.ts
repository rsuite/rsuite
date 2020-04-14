import { flattenTree } from '../utils/treeUtils';

const hasSymbol = typeof Symbol === 'function';
export const KEY_GROUP = hasSymbol ? Symbol('_$grouped') : '_$grouped';
export const KEY_GROUP_TITLE = 'groupTitle';

export default function getDataGroupBy(data: any[] = [], key: string, sort: Function): any[] {
  const tempData: any = {};
  const isSort = typeof sort === 'function';

  data.forEach(item => {
    if (!tempData[item[key]]) {
      tempData[item[key]] = [];
    }

    tempData[item[key]].push(item);
  });

  let nextData = Object.entries(tempData).map(([groupTitle, children]: [string, any[]]) => ({
    children: isSort ? children.sort(sort(false)) : children,
    [KEY_GROUP_TITLE]: groupTitle,
    [KEY_GROUP]: true
  }));

  if (isSort) {
    nextData = nextData.sort(sort(true));
  }

  return flattenTree(nextData);
}
