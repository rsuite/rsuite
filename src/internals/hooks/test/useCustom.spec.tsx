import React from 'react';
import CustomProvider from '../../../CustomProvider';
import useCustom from '../useCustom';
import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';

describe('useCustom', () => {
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
