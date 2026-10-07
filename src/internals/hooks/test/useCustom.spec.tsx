import React from 'react';
import CustomProvider from '../../../CustomProvider';
import enGB from '../../../locales/en_GB';
import ruRU from '../../../locales/ru_RU';
import useCustom from '../useCustom';
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

describe('useCustom', () => {
  it('Should preserve its configuration and date helper API', () => {
    const { result } = renderHook(() => useCustom());

    expect(Object.keys(result.current).sort()).toEqual(
      [
        'code',
        'rtl',
        'toasters',
        'disableRipple',
        'classPrefix',
        'propsWithDefaults',
        'getLocale',
        'formatDate',
        'parseDate'
      ].sort()
    );
  });

  it('Should format and parse dates using the default locale', () => {
    const { result } = renderHook(() => useCustom());
    const date = new Date(2024, 1, 29);

    expect(result.current.formatDate(date, 'dd/MM/yyyy')).toBe('29/02/2024');
    expect(result.current.parseDate('29/02/2024', 'dd/MM/yyyy', new Date(2020, 0, 1))).toEqual(
      date
    );
  });

  it('Should use the provider date locale for formatting and parsing', () => {
    const wrapper = ({ children }) => <CustomProvider locale={ruRU}>{children}</CustomProvider>;
    const { result } = renderHook(() => useCustom(), { wrapper });
    const date = new Date(2024, 1, 29);

    expect(result.current.formatDate(date, 'MMMM')).toBe('февраля');
    expect(result.current.parseDate('29 февраля 2024', 'd MMMM yyyy', date)).toEqual(date);
  });

  it('Should preserve provider date callbacks and their arguments', () => {
    const date = new Date(2024, 1, 29);
    const parsedDate = new Date(2030, 0, 2);
    const referenceDate = new Date(2020, 0, 1);
    const options = { weekStartsOn: 1 as const };
    const formatDate = vi.fn(() => 'provided format');
    const parseDate = vi.fn(() => parsedDate);
    const wrapper = ({ children }) => (
      <CustomProvider formatDate={formatDate} parseDate={parseDate}>
        {children}
      </CustomProvider>
    );
    const { result } = renderHook(() => useCustom(), { wrapper });

    expect(result.current.formatDate(date, 'custom', options)).toBe('provided format');
    expect(result.current.parseDate('provided', 'custom', referenceDate, options)).toBe(parsedDate);
    expect(formatDate).toHaveBeenCalledExactlyOnceWith(date, 'custom', options);
    expect(parseDate).toHaveBeenCalledExactlyOnceWith('provided', 'custom', referenceDate, options);
  });

  it('Should keep date callbacks stable and update them when the provider changes', () => {
    let locale = enGB;
    const wrapper = ({ children }) => <CustomProvider locale={locale}>{children}</CustomProvider>;
    const { result, rerender } = renderHook(() => useCustom(), { wrapper });
    const firstFormat = result.current.formatDate;
    const firstParse = result.current.parseDate;
    const firstGetLocale = result.current.getLocale;
    const date = new Date(2024, 1, 29);

    rerender();
    expect(result.current.formatDate).toBe(firstFormat);
    expect(result.current.parseDate).toBe(firstParse);
    expect(result.current.getLocale).toBe(firstGetLocale);

    locale = ruRU;
    rerender();
    expect(result.current.formatDate).not.toBe(firstFormat);
    expect(result.current.parseDate).not.toBe(firstParse);
    expect(result.current.getLocale).not.toBe(firstGetLocale);
    expect(result.current.formatDate(date, 'MMMM')).toBe('февраля');
    expect(result.current.parseDate('29 февраля 2024', 'd MMMM yyyy', date)).toEqual(date);
  });

  it('Should retain the formatting fallback when a provider formatter throws', () => {
    const wrapper = ({ children }) => (
      <CustomProvider
        formatDate={() => {
          throw new Error('Invalid format');
        }}
      >
        {children}
      </CustomProvider>
    );
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { result } = renderHook(() => useCustom(), { wrapper });
      expect(result.current.formatDate(new Date(2024, 1, 29), 'custom')).toBe(
        'Error: Invalid date format'
      );
    } finally {
      error.mockRestore();
    }
  });

  it('Should use the default value provided by CustomProvider', () => {
    const wrapper = ({ children }) => (
      <CustomProvider
        components={{
          Button: {
            defaultProps: { size: 'lg' }
          }
        }}
      >
        {children}
      </CustomProvider>
    );
    const { result } = renderHook(() => useCustom('Button'), { wrapper });

    expect(result.current.propsWithDefaults.size).to.equal('lg');
  });

  it('Should override the global default props by passing props', () => {
    const wrapper = ({ children }) => (
      <CustomProvider
        components={{
          Button: {
            defaultProps: { size: 'lg' }
          }
        }}
      >
        {children}
      </CustomProvider>
    );
    const { result } = renderHook(() => useCustom('Button', { size: 'sm' }), { wrapper });

    expect(result.current.propsWithDefaults.size).to.equal('sm');
  });

  it('Should use the default value provided by CustomProvider for locale', () => {
    const wrapper = ({ children }) => <CustomProvider>{children}</CustomProvider>;
    const { result } = renderHook(() => useCustom('Toggle'), { wrapper });

    expect(result.current.propsWithDefaults.locale).to.deep.equal({
      loading: 'Loading...',
      emptyMessage: 'No data found',
      remove: 'Remove',
      clear: 'Clear',
      on: 'ON',
      off: 'OFF'
    });
  });

  it('Should override the global default props by passing props for locale', () => {
    const wrapper = ({ children }) => <CustomProvider>{children}</CustomProvider>;
    const { result } = renderHook(
      () =>
        useCustom('Toggle', {
          locale: {
            on: 'Turn on',
            off: 'Turn off'
          }
        }),
      { wrapper }
    );

    expect(result.current.propsWithDefaults.locale).to.deep.equal({
      loading: 'Loading...',
      emptyMessage: 'No data found',
      remove: 'Remove',
      clear: 'Clear',
      on: 'Turn on',
      off: 'Turn off'
    });
  });
});
