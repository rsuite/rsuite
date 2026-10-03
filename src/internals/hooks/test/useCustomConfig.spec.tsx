import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CustomProvider from '../../../CustomProvider';
import Button from '../../../Button';
import { Fade, Bounce, Slide, Collapse } from '../../../Animation';
import enGB from '../../../locales/en_GB';
import useCustomConfig from '../useCustomConfig';

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
