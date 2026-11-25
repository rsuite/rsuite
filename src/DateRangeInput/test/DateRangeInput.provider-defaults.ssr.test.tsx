import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';
import DateRangeInput from '../DateRangeInput';

describe('DateRangeInput provider defaults on the server', () => {
  it('renders its own defaults without DOM access or callbacks', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
    const onChange = vi.fn();
    const html = renderToString(
      <CustomProvider
        components={{
          Calendar: { defaultProps: { className: 'calendar-default' } },
          DateRangeInput: {
            defaultProps: {
              id: 'range-default',
              format: 'yyyy/MM/dd',
              character: ' to ',
              onChange
            }
          }
        }}
      >
        <DateRangeInput value={[new Date(2024, 0, 2), new Date(2024, 0, 4)]} />
      </CustomProvider>
    );

    expect(html).toContain('id="range-default"');
    expect(html).toContain('value="2024/01/02 to 2024/01/04"');
    expect(html).not.toContain('calendar-default');
    expect(html).not.toContain('locale="[object Object]"');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('preserves the provider date locale and instance overrides', () => {
    const html = renderToString(
      <CustomProvider
        locale={zhCN}
        components={{
          DateRangeInput: { defaultProps: { id: 'range-default', character: ' to ' } }
        }}
      >
        <DateRangeInput
          id="range-instance"
          character=" / "
          value={[new Date(2024, 0, 2), new Date(2024, 0, 4)]}
        />
      </CustomProvider>
    );

    expect(html).toContain('id="range-instance"');
    expect(html).toContain('value="2024-01-02 / 2024-01-04"');
  });
});
