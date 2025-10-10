'use client';
import trim from 'lodash/trim';
export function transformData(data) {
  if (!data) {
    return [];
  }
  return data.map(function (item) {
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
export var shouldDisplay = function shouldDisplay(filterBy, value) {
  return function (item) {
    if (typeof filterBy === 'function') {
      return filterBy(value, item);
    }
    if (!trim(value)) {
      return false;
    }
    var keyword = value.toLocaleLowerCase();
    return ("" + item.label).toLocaleLowerCase().indexOf(keyword) >= 0;
  };
};