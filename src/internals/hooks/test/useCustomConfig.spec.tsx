import React from 'react';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CustomProvider from '../../../CustomProvider';
import Button from '../../../Button';
import { Fade, Bounce, Slide, Collapse } from '../../../Animation';
import enGB from '../../../locales/en_GB';
import useCustomConfig from '../useCustomConfig';
import Toggle from '../../../Toggle';
import Breadcrumb from '../../../Breadcrumb';
import Pagination from '../../../Pagination';
import Tag from '../../../Tag';
import type { CustomProviderProps } from '../../../CustomProvider';

describe('useCustomConfig', () => {
  it('Should preserve default props and instance overrides', () => {
    const wrapper = ({ children }) => (
      <CustomProvider components={{ Button: { defaultProps: { size: 'lg', disabled: true } } }}>
        {children}
      </CustomProvider>
    );
    const { result } = renderHook(() => useCustomConfig('Button', { size: 'sm' }), { wrapper });

    expect(result.current.propsWithDefaults).toEqual({ size: 'sm', disabled: true });
  });

  it('Should merge common, multiple component, instance and override locales', () => {
    const wrapper = ({ children }) => (
      <CustomProvider
        locale={{
          common: { ...enGB.common, remove: 'Erase' },
          Toggle: { on: 'Provider on', off: 'Provider off' },
          CloseButton: { closeLabel: 'Close overlay' }
        }}
      >
        {children}
      </CustomProvider>
    );
    const { result } = renderHook(() => useCustomConfig('Toggle', { locale: { on: 'Local on' } }), {
      wrapper
    });

    expect(result.current.getLocale(['Toggle', 'CloseButton'], { off: 'Override off' })).toEqual({
      ...enGB.common,
      remove: 'Erase',
      on: 'Local on',
      off: 'Override off',
      closeLabel: 'Close overlay'
    });
    expect(result.current.propsWithDefaults.locale).toEqual({
      ...enGB.common,
      remove: 'Erase',
      on: 'Local on',
      off: 'Provider off'
    });
  });

  it('Should keep getLocale stable across unrelated props and update it for a new locale', () => {
    const instanceLocale = { on: 'Local on' };
    let locale = enGB;
    const wrapper = ({ children }) => <CustomProvider locale={locale}>{children}</CustomProvider>;
    const { result, rerender } = renderHook(
      ({ size }) => useCustomConfig('Button', { size, locale: instanceLocale }),
      { wrapper, initialProps: { size: 'sm' } }
    );
    const firstGetLocale = result.current.getLocale;

    rerender({ size: 'lg' });
    expect(result.current.getLocale).toBe(firstGetLocale);
    expect(result.current.propsWithDefaults.size).toBe('lg');

    locale = { ...enGB, common: { ...enGB.common, remove: 'Erase' } };
    rerender({ size: 'lg' });
    expect(result.current.getLocale).not.toBe(firstGetLocale);
    expect(result.current.getLocale('Toggle').remove).toBe('Erase');
    expect(result.current.getLocale('Toggle').on).toBe('Local on');
  });

  it('Should respond to provider configuration updates', () => {
    let rtl = false;
    let disableRipple = false;
    let classPrefix = 'first';
    const wrapper = ({ children }) => (
      <CustomProvider rtl={rtl} disableRipple={disableRipple} classPrefix={classPrefix}>
        {children}
      </CustomProvider>
    );
    const { result, rerender } = renderHook(() => useCustomConfig(), { wrapper });

    expect(result.current).toMatchObject({
      rtl: false,
      disableRipple: false,
      classPrefix: 'first'
    });

    rtl = true;
    disableRipple = true;
    classPrefix = 'second';
    rerender();
    expect(result.current).toMatchObject({ rtl: true, disableRipple: true, classPrefix: 'second' });
  });

  it('Should preserve defaults in Button, SafeAnchor and the four animation primitives', () => {
    render(
      <CustomProvider
        disableRipple
        components={{
          Button: { defaultProps: { size: 'lg' } },
          SafeAnchor: { defaultProps: { id: 'configured-anchor' } },
          Fade: { defaultProps: { in: true } },
          Bounce: { defaultProps: { in: true } },
          Slide: { defaultProps: { in: true } },
          Collapse: { defaultProps: { in: true } }
        }}
      >
        <Button href="/target">button</Button>
        <Fade>
          <div>fade</div>
        </Fade>
        <Bounce>
          <div>bounce</div>
        </Bounce>
        <Slide>
          <div>slide</div>
        </Slide>
        <Collapse>
          <div>collapse</div>
        </Collapse>
      </CustomProvider>
    );

    const button = screen.getByRole('link', { name: 'button' });
    expect(button).toHaveAttribute('data-size', 'lg');
    expect(button).toHaveAttribute('id', 'configured-anchor');
    expect(button.querySelector('.rs-ripple')).toBeNull();
    expect(screen.getByText('fade')).toHaveClass('rs-anim-in');
    expect(screen.getByText('bounce')).toHaveClass('rs-anim-bounce-in');
    expect(screen.getByText('slide')).toHaveClass('rs-anim-slide-in');
    expect(screen.getByText('collapse')).toHaveClass('rs-anim-in');
  });
});

describe('component locale defaults', () => {
  it('merges provider, default and instance translations without changing other defaults', () => {
    const defaults = Object.freeze({ on: 'Default on', off: 'Default off' });
    const wrapper = ({ children }) => (
      <CustomProvider components={{ Toggle: { defaultProps: { size: 'lg', locale: defaults } } }}>
        {children}
      </CustomProvider>
    );
    const { result } = renderHook(
      () => useCustomConfig('Toggle', { size: 'sm', locale: { off: 'Instance off' } }),
      { wrapper }
    );
    expect(result.current.propsWithDefaults).toEqual({
      size: 'sm',
      locale: { ...enGB.common, on: 'Default on', off: 'Instance off' }
    });
    expect(defaults).toEqual({ on: 'Default on', off: 'Default off' });
  });

  it('applies the same precedence to multi-key lookups and call-site overrides', () => {
    const wrapper = ({ children }) => (
      <CustomProvider
        locale={{ ...enGB, common: { ...enGB.common, remove: 'Erase' } }}
        components={{
          Toggle: { defaultProps: { locale: { on: 'Default on', off: 'Default off' } } }
        }}
      >
        {children}
      </CustomProvider>
    );
    const { result } = renderHook(
      () => useCustomConfig('Toggle', { locale: { off: 'Instance off' } }),
      { wrapper }
    );
    expect(result.current.getLocale(['Toggle', 'CloseButton'])).toEqual({
      ...enGB.common,
      remove: 'Erase',
      closeLabel: 'Close',
      on: 'Default on',
      off: 'Instance off'
    });
    expect(result.current.getLocale(['Toggle', 'CloseButton'], { on: 'Override on' }).on).toBe(
      'Override on'
    );
  });

  it('keeps the lookup stable for unrelated defaults and responds to changed or removed translations', () => {
    const locale = { on: 'Default on' };
    let components: CustomProviderProps['components'] = {
      Toggle: { defaultProps: { size: 'sm', locale } }
    };
    const wrapper = ({ children }) => (
      <CustomProvider components={components}>{children}</CustomProvider>
    );
    const { result, rerender } = renderHook(() => useCustomConfig('Toggle'), { wrapper });
    expect(result.current.getLocale('Toggle').on).toBe('Default on');
    const initial = result.current.getLocale;
    components = {
      Toggle: { defaultProps: { size: 'lg', locale } },
      Button: { defaultProps: { size: 'lg' } }
    };
    rerender();
    expect(result.current.getLocale).toBe(initial);
    expect(result.current.propsWithDefaults.size).toBe('lg');
    components = { Toggle: { defaultProps: { locale: { on: 'Updated on' } } } };
    rerender();
    expect(result.current.getLocale).not.toBe(initial);
    expect(result.current.propsWithDefaults.locale.on).toBe('Updated on');
    components = {};
    rerender();
    expect(result.current.propsWithDefaults.locale).toEqual({ ...enGB.common, ...enGB.Toggle });
  });

  it('uses the selected component defaults without leaking them into another component', () => {
    const wrapper = ({ children }) => (
      <CustomProvider
        components={{
          Toggle: { defaultProps: { locale: { on: 'Default on' } } },
          Breadcrumb: { defaultProps: { locale: { expandText: 'Show folders' } } }
        }}
      >
        {children}
      </CustomProvider>
    );
    const { result, rerender } = renderHook(
      ({ component }: { component: 'Toggle' | 'Breadcrumb' }) => useCustomConfig(component),
      { wrapper, initialProps: { component: 'Toggle' } }
    );
    expect(result.current.propsWithDefaults.locale.on).toBe('Default on');
    rerender({ component: 'Breadcrumb' });
    expect(result.current.propsWithDefaults.locale).toEqual({
      ...enGB.common,
      expandText: 'Show folders'
    });
  });

  it.each(['Tag', 'Table', 'Tree', 'CheckTree'] as const)(
    'preserves instance translations for %s with a shared locale namespace',
    component => {
      const wrapper = ({ children }) => (
        <CustomProvider
          components={{
            [component]: { defaultProps: { locale: { ...enGB.common, remove: 'Default remove' } } }
          }}
        >
          {children}
        </CustomProvider>
      );
      const { result } = renderHook(
        () => useCustomConfig(component, { locale: { remove: 'Instance remove' } }),
        { wrapper }
      );
      expect(result.current.propsWithDefaults.locale).toEqual({
        ...enGB.common,
        remove: 'Instance remove'
      });
      expect(
        result.current.getLocale('common', result.current.propsWithDefaults.locale).remove
      ).toBe('Instance remove');
    }
  );

  it('applies configured translations and other defaults to the public Pagination', () => {
    render(
      <CustomProvider
        components={{
          Pagination: { defaultProps: { first: true, locale: { next: 'Next batch' } } }
        }}
      >
        <Pagination total={30} limit={10} next prev locale={{ prev: 'Previous batch' }} />
      </CustomProvider>
    );
    expect(screen.getByRole('button', { name: 'Next batch' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Previous batch' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'First' })).toBeTruthy();
  });

  it('renders configured component names and honors instance overrides', () => {
    render(
      <CustomProvider
        components={{
          Toggle: { defaultProps: { locale: { on: 'Default on', off: 'Default off' } } },
          Breadcrumb: { defaultProps: { maxItems: 2, locale: { expandText: 'Show folders' } } },
          Tag: { defaultProps: { locale: { ...enGB.common, remove: 'Default remove' } } }
        }}
      >
        <Toggle defaultChecked locale={{ off: 'Instance off' }} />
        <Tag closable locale={{ ...enGB.common, remove: 'Instance remove' }}>
          Tag
        </Tag>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Account</Breadcrumb.Item>
          <Breadcrumb.Item>Billing</Breadcrumb.Item>
        </Breadcrumb>
      </CustomProvider>
    );
    fireEvent.click(screen.getByRole('switch', { name: 'Default on' }));
    expect(screen.getByRole('switch', { name: 'Instance off' })).not.toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: 'Show folders' }));
    expect(screen.getByText('Account')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Instance remove' })).toBeTruthy();
  });
});
