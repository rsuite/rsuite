import { flattenTree } from '../utils/treeUtils';

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
    groupTitle,
    _$grouped: true
  }));

  if (isSort) {
    nextData = nextData.sort(sort(true));
  }

  return flattenTree(nextData);
}
