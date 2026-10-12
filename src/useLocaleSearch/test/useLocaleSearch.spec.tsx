import React, { StrictMode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CustomProvider from '../../CustomProvider';
import enGB from '../../locales/en_GB';
import trTR from '../../locales/tr_TR';
import useLocaleSearch, { LocaleSearchMatch } from '..';

const wrapper = StrictMode;

describe('useLocaleSearch', () => {
  it('Should accept inline callbacks, locale arrays and options without repeated searches', async () => {
    const items = [{ label: 'Café' }];
    const project = vi.fn((item: (typeof items)[number]) => item.label);
    const { result, rerender } = renderHook(
      () =>
        useLocaleSearch({
          items,
          query: 'cafe',
          getText: item => project(item),
          locale: ['en-GB'],
          collatorOptions: { sensitivity: 'base' }
        }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.status).toBe('success'));
    const matches = result.current.items;
    const reload = result.current.reload;
    rerender();
    await act(async () => {});
    expect(project).toHaveBeenCalledTimes(1);
    expect(result.current.items).toBe(matches);
    expect(matches[0]).toBe(items[0]);
    expect(result.current.reload).toBe(reload);
  });

  it('Should follow provider locale while respecting an explicit override', async () => {
    const items = ['ISPARTA'];
    let providerLocale = enGB;
    const { result, rerender } = renderHook(
      ({ locale }: { locale?: string }) =>
        useLocaleSearch({
          items,
          query: 'ispa',
          getText: item => item,
          locale
        }),
      {
        initialProps: {},
        wrapper: ({ children }) => (
          <StrictMode>
            <CustomProvider locale={providerLocale}>{children}</CustomProvider>
          </StrictMode>
        )
      }
    );
    await waitFor(() => expect(result.current.items).toEqual(items));
    providerLocale = trTR;
    rerender({});
    expect(result.current.items).toEqual([]);
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.items).toEqual([]);
    rerender({ locale: 'en-GB' });
    await waitFor(() => expect(result.current.items).toEqual(items));
    rerender({});
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.items).toEqual([]);
  });

  it('Should recompute when the matching mode or collation changes', async () => {
    const items = ['Straße'];
    const { result, rerender } = renderHook(
      ({
        query,
        match,
        sensitivity
      }: {
        query: string;
        match: LocaleSearchMatch;
        sensitivity: Intl.CollatorOptions['sensitivity'];
      }) =>
        useLocaleSearch({
          items,
          query,
          match,
          getText: item => item,
          locale: 'de-DE',
          collatorOptions: { sensitivity }
        }),
      { initialProps: { query: 'sse', match: 'endsWith', sensitivity: 'base' }, wrapper }
    );
    await waitFor(() => expect(result.current.items).toEqual(items));
    rerender({ query: 'str', match: 'endsWith', sensitivity: 'base' });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.items).toEqual([]);
    rerender({ query: 'str', match: 'startsWith', sensitivity: 'base' });
    await waitFor(() => expect(result.current.items).toEqual(items));
    rerender({ query: 'str', match: 'startsWith', sensitivity: 'variant' });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.items).toEqual([]);
  });

  it('Should use the latest selector on reload and track explicit captured dependencies', async () => {
    const items = [{ label: 'Café', alternate: 'Coffee' }];
    const { result, rerender } = renderHook(
      ({ field, dependency }: { field: 'label' | 'alternate'; dependency: number }) =>
        useLocaleSearch({
          items,
          query: 'cafe',
          getText: item => item[field],
          dependencies: [dependency]
        }),
      { initialProps: { field: 'label', dependency: 0 }, wrapper }
    );
    await waitFor(() => expect(result.current.items).toEqual(items));
    rerender({ field: 'alternate', dependency: 0 });
    await act(async () => {});
    expect(result.current.items).toEqual(items);
    act(() => result.current.reload());
    expect(result.current.items).toEqual([]);
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.items).toEqual([]);
    rerender({ field: 'label', dependency: 1 });
    await waitFor(() => expect(result.current.items).toEqual(items));
  });

  it('Should replace the dataset without reusing previous results', async () => {
    const first = [{ label: 'Café' }];
    const second = [{ label: 'Café replacement' }];
    const { result, rerender } = renderHook(
      ({ items }) => useLocaleSearch({ items, query: 'cafe', getText: item => item.label }),
      { initialProps: { items: first }, wrapper }
    );
    await waitFor(() => expect(result.current.items[0]).toBe(first[0]));
    rerender({ items: second });
    expect(result.current.items).toEqual([]);
    await waitFor(() => expect(result.current.items[0]).toBe(second[0]));
  });

  it('Should keep disabled searches idle and search current inputs when enabled', async () => {
    const items = ['Café'];
    const getText = vi.fn((item: string) => item);
    const { result, rerender } = renderHook(
      ({ enabled, query }) => useLocaleSearch({ items, query, enabled, getText }),
      { initialProps: { enabled: false, query: 'old' }, wrapper }
    );
    act(() => result.current.reload());
    rerender({ enabled: false, query: 'cafe' });
    await act(async () => {});
    expect(result.current.status).toBe('idle');
    expect(result.current.items).toEqual([]);
    expect(getText).not.toHaveBeenCalled();
    rerender({ enabled: true, query: 'cafe' });
    await waitFor(() => expect(result.current.items).toEqual(items));
  });

  it('Should expose projection errors and recover on reload', async () => {
    const items = ['Café'];
    let fail = false;
    const { result } = renderHook(
      () =>
        useLocaleSearch({
          items,
          query: 'cafe',
          getText: item => {
            if (fail) throw new Error('Projection failed');
            return item;
          }
        }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.items).toEqual(items));
    fail = true;
    act(() => result.current.reload());
    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.items).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error?.message).toBe('Projection failed');
    fail = false;
    act(() => result.current.reload());
    await waitFor(() => expect(result.current.items).toEqual(items));
    expect(result.current.error).toBeNull();
  });

  it('Should recover a failed Intl initialization after capability restoration', async () => {
    const descriptor = Object.getOwnPropertyDescriptor(Intl, 'Segmenter')!;
    const items = ['Café'];
    Object.defineProperty(Intl, 'Segmenter', { configurable: true, value: undefined });
    try {
      const { result } = renderHook(
        () => useLocaleSearch({ items, query: 'cafe', getText: item => item }),
        { wrapper }
      );
      await waitFor(() => expect(result.current.status).toBe('error'));
      expect(result.current.error?.message).toContain('Intl.Segmenter');
      expect(result.current.items).toEqual([]);
      Object.defineProperty(Intl, 'Segmenter', descriptor);
      act(() => result.current.reload());
      await waitFor(() => expect(result.current.items).toEqual(items));
      expect(result.current.error).toBeNull();
    } finally {
      Object.defineProperty(Intl, 'Segmenter', descriptor);
    }
  });
});
