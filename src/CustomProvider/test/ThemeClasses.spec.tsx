import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import CustomProvider from '../CustomProvider';

describe('CustomProvider theme lifetime', () => {
  let originalClassName: string;

  beforeEach(() => {
    originalClassName = document.body.className;
    document.body.className = 'app-shell';
  });

  afterEach(() => {
    cleanup();
    document.body.className = originalClassName;
  });

  function expectThemes(...themes: string[]) {
    expect(
      [...document.body.classList]
        .filter(name => name.startsWith('rs-theme-') || name.startsWith('custom-theme-'))
        .sort()
    ).toEqual(themes.sort());
    expect(document.body.classList.contains('app-shell')).toBe(true);
  }

  it('removes a provider theme after unmount without removing other body classes', () => {
    const view = render(<CustomProvider theme="dark" />);
    expectThemes('rs-theme-dark');
    view.unmount();
    expectThemes();
  });

  it('restores an authored theme after the provider unmounts', () => {
    document.body.classList.add('rs-theme-light');
    const view = render(<CustomProvider theme="dark" />);
    expectThemes('rs-theme-dark');
    view.unmount();
    expectThemes('rs-theme-light');
  });

  it('releases the current theme when the theme prop is removed', () => {
    document.body.classList.add('rs-theme-light');
    const view = render(<CustomProvider theme="dark" />);
    view.rerender(<CustomProvider theme="high-contrast" />);
    expectThemes('rs-theme-high-contrast');
    view.rerender(<CustomProvider />);
    expectThemes('rs-theme-light');
    view.unmount();
    expectThemes('rs-theme-light');
  });

  it('restores both prefix domains when the prefix changes', () => {
    document.body.classList.add('rs-theme-light', 'custom-theme-high-contrast');
    const view = render(<CustomProvider theme="dark" />);
    expectThemes('rs-theme-dark', 'custom-theme-high-contrast');
    view.rerender(<CustomProvider theme="dark" classPrefix="custom" />);
    expectThemes('rs-theme-light', 'custom-theme-dark');
    view.unmount();
    expectThemes('rs-theme-light', 'custom-theme-high-contrast');
  });

  it('returns to the other live root before restoring the authored theme', () => {
    document.body.classList.add('rs-theme-high-contrast');
    const first = render(<CustomProvider theme="dark" />);
    const second = render(<CustomProvider theme="light" />);
    expectThemes('rs-theme-light');
    second.unmount();
    expectThemes('rs-theme-dark');
    first.unmount();
    expectThemes('rs-theme-high-contrast');
  });

  it('does not restore an already unmounted root after out-of-order cleanup', () => {
    document.body.classList.add('rs-theme-high-contrast');
    const first = render(<CustomProvider theme="dark" />);
    const second = render(<CustomProvider theme="light" />);
    first.unmount();
    expectThemes('rs-theme-light');
    second.unmount();
    expectThemes('rs-theme-high-contrast');
  });

  it('shares ownership between equivalent legacy prefixes', () => {
    document.body.classList.add('rs-theme-light');
    const first = render(<CustomProvider classPrefix="rs" theme="dark" />);
    const second = render(<CustomProvider classPrefix="rs-" theme="high-contrast" />);
    first.unmount();
    expectThemes('rs-theme-high-contrast');
    second.unmount();
    expectThemes('rs-theme-light');
  });

  it('keeps independent prefixes intact when another root unmounts', () => {
    document.body.classList.add('rs-theme-high-contrast', 'custom-theme-dark');
    const first = render(<CustomProvider theme="dark" />);
    const second = render(<CustomProvider classPrefix="custom" theme="light" />);
    first.unmount();
    expectThemes('rs-theme-high-contrast', 'custom-theme-light');
    second.unmount();
    expectThemes('rs-theme-high-contrast', 'custom-theme-dark');
  });

  it('restores the authored theme through StrictMode effect replay', () => {
    document.body.classList.add('rs-theme-high-contrast');
    const view = render(
      <React.StrictMode>
        <CustomProvider theme="dark" />
      </React.StrictMode>
    );
    expectThemes('rs-theme-dark');
    view.unmount();
    expectThemes('rs-theme-high-contrast');
  });

  it('preserves an external theme change on unmount', () => {
    document.body.classList.add('rs-theme-light');
    const view = render(<CustomProvider theme="dark" />);
    document.body.classList.remove('rs-theme-dark');
    document.body.classList.add('rs-theme-high-contrast');
    view.unmount();
    expectThemes('rs-theme-high-contrast');
  });

  it('restores an external theme after a later explicit provider update', () => {
    const first = render(<CustomProvider theme="dark" />);
    const second = render(<CustomProvider theme="light" />);
    document.body.classList.remove('rs-theme-light');
    document.body.classList.add('rs-theme-high-contrast');
    second.unmount();
    expectThemes('rs-theme-high-contrast');
    first.rerender(<CustomProvider theme="light" />);
    expectThemes('rs-theme-light');
    first.unmount();
    expectThemes('rs-theme-high-contrast');
  });

  it('preserves unrelated classes added while the provider is mounted', () => {
    document.body.classList.add('rs-theme-light');
    const view = render(<CustomProvider theme="dark" />);
    document.body.classList.add('route-ready');
    view.unmount();
    expectThemes('rs-theme-light');
    expect(document.body.classList.contains('route-ready')).toBe(true);
  });

  it('releases its own class when an external theme is added', () => {
    const view = render(<CustomProvider theme="dark" />);
    document.body.classList.add('rs-theme-high-contrast');
    view.unmount();
    expectThemes('rs-theme-high-contrast');
  });

  it('preserves an external addition while older live roots clean up', () => {
    const first = render(<CustomProvider theme="dark" />);
    const second = render(<CustomProvider theme="light" />);
    document.body.classList.add('rs-theme-high-contrast');
    first.unmount();
    expectThemes('rs-theme-high-contrast');
    second.unmount();
    expectThemes('rs-theme-high-contrast');
  });

  it('returns to an external addition after a subsequent provider unmounts', () => {
    const first = render(<CustomProvider theme="dark" />);
    document.body.classList.add('rs-theme-high-contrast');
    const second = render(<CustomProvider theme="light" />);
    expectThemes('rs-theme-light');
    second.unmount();
    expectThemes('rs-theme-high-contrast');
    first.unmount();
    expectThemes('rs-theme-high-contrast');
  });

  it('retains an authored class when an external theme is added', () => {
    document.body.classList.add('rs-theme-dark');
    const view = render(<CustomProvider theme="dark" />);
    document.body.classList.add('rs-theme-high-contrast');
    view.unmount();
    expectThemes('rs-theme-dark', 'rs-theme-high-contrast');
  });
});
