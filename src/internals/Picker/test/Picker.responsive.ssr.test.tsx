import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import DatePicker from '../../../DatePicker';
import DateRangePicker from '../../../DateRangePicker';
import TimePicker from '../../../TimePicker';
import TimeRangePicker from '../../../TimeRangePicker';

const data = [{ label: 'Alpha', value: 'a' }];

describe.each(['mdDown', '(max-width: 1279px)'])('Picker responsive SSR: %s', responsive => {
  const props = { id: 'server-picker', 'aria-label': 'Country', responsive };
  it.each([
    { name: 'SelectPicker', element: <SelectPicker {...props} data={data} /> },
    { name: 'CheckPicker', element: <CheckPicker {...props} data={data} /> },
    { name: 'Cascader', element: <Cascader {...props} data={data} /> },
    { name: 'MultiCascader', element: <MultiCascader {...props} data={data} /> },
    { name: 'TreePicker', element: <TreePicker {...props} data={data} /> },
    { name: 'CheckTreePicker', element: <CheckTreePicker {...props} data={data} /> },
    { name: 'InputPicker', element: <InputPicker {...props} data={data} /> },
    { name: 'TagPicker', element: <TagPicker {...props} data={data} /> },
    { name: 'DatePicker', element: <DatePicker {...props} /> },
    { name: 'DateRangePicker', element: <DateRangePicker {...props} /> },
    { name: 'TimePicker', element: <TimePicker {...props} /> },
    { name: 'TimeRangePicker', element: <TimeRangePicker {...props} /> }
  ])('$name renders without a browser', ({ element }) => {
    expect(typeof window).toBe('undefined');
    const html = renderToString(element);
    expect(html).toContain('id="server-picker"');
    expect(html).toContain('aria-label="Country"');
    expect(html).not.toContain('rs-drawer');
    expect(html).not.toContain('responsive=');
  });
});
