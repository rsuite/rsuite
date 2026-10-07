import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import CustomProvider from '../../../CustomProvider';
import useCustom from '../useCustom';

describe('useCustom SSR', () => {
  it('Should format and parse dates without a browser or provider', () => {
    function Snapshot() {
      const { formatDate, parseDate, rtl } = useCustom();
      const date = parseDate('29/02/2024', 'dd/MM/yyyy', new Date(2020, 0, 1));
      return <span>{`${formatDate(date, 'dd/MM/yyyy')}:${rtl}`}</span>;
    }

    expect(renderToString(<Snapshot />)).toBe('<span>29/02/2024:false</span>');
  });

  it('Should preserve provider date callbacks and component defaults on the server', () => {
    const parsedDate = new Date(2030, 0, 2);
    const formatDate = vi.fn(() => 'provided format');
    const parseDate = vi.fn(() => parsedDate);

    function Snapshot() {
      const { formatDate, parseDate, propsWithDefaults } = useCustom('Button', { size: 'sm' });
      const date = parseDate('provided', 'custom');
      return <span>{`${formatDate(date, 'custom')}:${propsWithDefaults.size}`}</span>;
    }

    expect(
      renderToString(
        <CustomProvider
          formatDate={formatDate}
          parseDate={parseDate}
          components={{ Button: { defaultProps: { size: 'lg' } } }}
        >
          <Snapshot />
        </CustomProvider>
      )
    ).toBe('<span>provided format:sm</span>');
    expect(formatDate).toHaveBeenCalledExactlyOnceWith(parsedDate, 'custom', undefined);
    expect(parseDate).toHaveBeenCalledExactlyOnceWith('provided', 'custom', undefined, undefined);
  });
});
