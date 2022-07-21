import { ItemDataType } from '../../src/@types/common';

export function mockTreeData(options: {
  limits: number[];
  labels: string | string[] | ((layer: number, value: string) => string);
}): ItemDataType[] {
  const { limits, labels } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list: ItemDataType[], parentValue?: string, layer = 0) => {
    const length = limits[layer];

    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? parentValue + '-' + (index + 1) : index + 1 + '';
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;
      const row: ItemDataType = {
        label: typeof label === 'function' ? label(layer, value) : label + ' ' + value,
        value
      };

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}

export const mockTreeDataToString = `export function mockTreeData(options){
  const { limits, labels } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list, parentValue, layer = 0) => {
    const length = limits[layer];
    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? parentValue + '-' + (index + 1) : index + 1 + '';
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;
      const row = {
        label: typeof label === 'function' ? label(layer, value) : label + ' ' + value,
        value
      };

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}`;
