import trim from 'lodash/trim';

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

export const shouldDisplay = <TItem extends { label: string }>(
  filterBy: ((value: string, item: TItem) => boolean) | undefined,
  value: string
) => {
  return (item: TItem) => {
    if (typeof filterBy === 'function') {
      return filterBy(value, item);
    }

    if (!trim(value)) {
      return false;
    }
    const keyword = value.toLocaleLowerCase();
    return `${item.label}`.toLocaleLowerCase().indexOf(keyword) >= 0;
  };
};
