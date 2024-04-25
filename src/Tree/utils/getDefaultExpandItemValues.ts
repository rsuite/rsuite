import { UNSAFE_flattenTree } from './flattenTree';

interface Options {
  valueKey: string;
  defaultExpandAll: boolean;
  childrenKey: string;
  defaultExpandItemValues?: any[];
}
export function getDefaultExpandItemValues<TItem>(data: TItem[], options: Options) {
  const { valueKey, defaultExpandAll, childrenKey, defaultExpandItemValues = [] } = options;
  if (defaultExpandAll) {
    return UNSAFE_flattenTree(data, childrenKey)
      .filter(item => Array.isArray(item[childrenKey]) && item[childrenKey].length > 0)
      .map(item => item[valueKey]);
  }
  return defaultExpandItemValues;
}
