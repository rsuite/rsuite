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
    groupTitle,
    children: isSort ? children.sort(sort(false)) : children
  }));

  if (isSort) {
    nextData = nextData.sort(sort(true));
  }

  return nextData;
}
