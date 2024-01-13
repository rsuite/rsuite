/**
 * Mock tree data
 * @example
 * mockTreeData(['1', '2', ['3', '3-1', '3-2']])
 * // => [{ value: '1', label: '1' },
 *        { value: '2', label: '2' },
 *        { value: '3', label: '3', children: [{ value: '3-1', label: '3-1' }, { value: '3-2', label: '3-2' }] }
 *       ]
 */
export function mockTreeData(
  data,
  options?: {
    valueKey?: string;
    labelKey?: string;
    childrenKey?: string;
  }
) {
  const items: any[] = [];
  const { valueKey = 'value', labelKey = 'label', childrenKey = 'children' } = options || {};

  data.forEach(item => {
    if (Array.isArray(item)) {
      const children = mockTreeData(item.slice(1), options);
      items.push({
        [valueKey]: item[0],
        [labelKey]: item[0],
        [childrenKey]: children
      });
    } else {
      items.push({
        [valueKey]: item,
        [labelKey]: item
      });
    }
  });

  return items;
}
