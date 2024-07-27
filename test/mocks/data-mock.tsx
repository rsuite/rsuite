import React from 'react';
import sinon from 'sinon';

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

export function mockGroupData(data, options) {
  const items: any[] = [];
  const { labelElementType: Label = 'span', ...rest } = options || {};

  data.forEach(item => {
    items.push({
      label: <Label>{item}</Label>,
      value: item,
      ...rest
    });
  });
  return items;
}

export function mockClipboardEvent(data: string) {
  // Create a mock ClipboardEvent
  const clipboardEvent = new Event('paste', {
    bubbles: true,
    cancelable: true
  });

  // Add a clipboardData property with getData method to the event
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  clipboardEvent.clipboardData = {
    getData: sinon.stub().withArgs('text').returns(data)
  };

  return clipboardEvent;
}
