import trim from 'lodash/trim';
import { ItemDataType } from '../@types/common';

export function transformData(data: any[]) {
  if (!data) {
    return [];
  }
  return data.map(item => {
    if (typeof item === 'string') {
      return {
        value: item,
        label: item
      };
    }

    if (typeof item === 'object') {
      return item;
    }
  });
}

export const shouldDisplay = (
  filterBy: (value: string, item: ItemDataType) => boolean,
  value: any
) => {
  return (item: any) => {
    if (typeof filterBy === 'function') {
      return filterBy(value, item);
    }

    if (!trim(value)) {
      return false;
    }
    const keyword = (value || '').toLocaleLowerCase();
    return `${item.label}`.toLocaleLowerCase().indexOf(keyword) >= 0;
  };
};
