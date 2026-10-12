import React, { StrictMode, Suspense, startTransition, useState } from 'react';
import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useAsyncSearch, { AsyncSearchContext } from '..';

const wrapper = StrictMode;

describe('useAsyncSearch request identity', () => {
  it('Should settle an inline search without requesting again on unrelated renders', async () => {
    const calls: string[] = [];
    const { result, rerender } = renderHook(
      ({ query }) =>
        useAsyncSearch({
          query,
          search: ({ query }) => {
            calls.push(query);
            return [query];
          }
        }),
      { initialProps: { query: 'Alpha' }, wrapper }
    );
    await waitFor(() => expect(result.current.status).toBe('success'));
    const items = result.current.items;
    const reload = result.current.reload;
    rerender({ query: 'Alpha' });
    await act(async () => {});
    expect(calls).toEqual(['Alpha']);
    expect(result.current.items).toBe(items);
    expect(result.current.reload).toBe(reload);
  });

  it('Should use the latest committed callback on query changes and reload', async () => {
    const calls: string[] = [];
    const { result, rerender } = renderHook(
      ({ query, prefix }) =>
        useAsyncSearch({
          query,
          search: () => {
            calls.push(prefix + query);
            return [prefix + query];
          }
        }),
      { initialProps: { query: 'a', prefix: 'old-' }, wrapper }
    );
    await waitFor(() => expect(result.current.items).toEqual(['old-a']));
    rerender({ query: 'a', prefix: 'new-' });
    await act(async () => {});
    expect(calls).toEqual(['old-a']);
    act(() => result.current.reload());
    expect(result.current.items).toEqual([]);
    await waitFor(() => expect(result.current.items).toEqual(['new-a']));
    rerender({ query: 'b', prefix: 'latest-' });
    expect(result.current.loading).toBe(true);
    expect(result.current.items).toEqual([]);
    await waitFor(() => expect(result.current.items).toEqual(['latest-b']));
    expect(calls).toEqual(['old-a', 'new-a', 'latest-b']);
  });

  it('Should recompute for changed data and locale dependencies', async () => {
    const first = ['ISPARTA', 'İZMİR'];
    const { result, rerender } = renderHook(
      ({ data, locale }) =>
        useAsyncSearch({
          query: 'i',
          dependencies: [data, locale],
          search: ({ query }) =>
            data.filter(item => item.toLocaleLowerCase(locale).startsWith(query))
        }),
      { initialProps: { data: first, locale: 'en-GB' }, wrapper }
    );
    await waitFor(() => expect(result.current.items).toEqual(first));
    rerender({ data: first, locale: 'tr-TR' });
    expect(result.current.items).toEqual([]);
    await waitFor(() => expect(result.current.items).toEqual(['İZMİR']));
    rerender({ data: ['İSTANBUL'], locale: 'tr-TR' });
    await waitFor(() => expect(result.current.items).toEqual(['İSTANBUL']));
  });

  it('Should compare dependency values with Object.is and allow a changed count', async () => {
    const search = vi.fn(() => ['result']);
    const { result, rerender } = renderHook(
      ({ dependencies }) => useAsyncSearch({ query: '', dependencies, search }),
      { initialProps: { dependencies: [NaN, 0] }, wrapper }
    );
    await waitFor(() => expect(result.current.status).toBe('success'));
    rerender({ dependencies: [NaN, 0] });
    await act(async () => {});
    expect(search).toHaveBeenCalledTimes(1);
    rerender({ dependencies: [NaN, -0] });
    await waitFor(() => expect(search).toHaveBeenCalledTimes(2));
    rerender({ dependencies: [NaN] });
    await waitFor(() => expect(search).toHaveBeenCalledTimes(3));
    expect(console.error).not.toHaveBeenCalled();
  });

  it('Should snapshot the dependency list instead of retaining the caller array', async () => {
    const dependencies = ['a'];
    const search = vi.fn(() => dependencies.slice());
    const { result, rerender } = renderHook(
      () => useAsyncSearch({ query: '', dependencies, search }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.items).toEqual(['a']));
    dependencies[0] = 'b';
    rerender();
    await waitFor(() => expect(result.current.items).toEqual(['b']));
    expect(search).toHaveBeenCalledTimes(2);
  });

  it('Should not leak a callback from an abandoned suspended render into reload', async () => {
    const calls: string[] = [];
    const suspended = new Promise<never>(() => {});
    let change!: React.Dispatch<React.SetStateAction<string>>;
    let reload!: () => void;
    let attempted = false;
    function Probe() {
      const [query, setQuery] = useState('committed');
      change = setQuery;
      const result = useAsyncSearch({
        query,
        search: () => {
          calls.push(query);
          return [query];
        }
      });
      if (query === 'suspended') {
        attempted = true;
        throw suspended;
      }
      reload = result.reload;
      return (
        <output>
          {result.status}:{result.items.join(',')}
        </output>
      );
    }
    render(
      <StrictMode>
        <Suspense fallback="Waiting">
          <Probe />
        </Suspense>
      </StrictMode>
    );
    await screen.findByText('success:committed');
    act(() => startTransition(() => change('suspended')));
    await waitFor(() => expect(attempted).toBe(true));
    act(() => reload());
    await waitFor(() => expect(calls).toEqual(['committed', 'committed']));
    expect(screen.getByText('success:committed')).toBeTruthy();
  });

  it('Should copy a returned array before exposing it', async () => {
    const source = [{ id: 1 }];
    const { result } = renderHook(() => useAsyncSearch({ query: '', search: () => source }), {
      wrapper
    });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.items).not.toBe(source);
    expect(result.current.items[0]).toBe(source[0]);
    source.push({ id: 2 });
    expect(result.current.items).toHaveLength(1);
  });

  it('Should contain rejection values that cannot be converted to text', async () => {
    const { result } = renderHook(
      () => useAsyncSearch({ query: '', search: () => Promise.reject(Object.create(null)) }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.error?.message).toBe('Search failed.');
    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual([]);
  });

  it.each(['throw', 'reject', 'invalid', 'abort'] as const)(
    'Should settle %s failures and recover on reload',
    async behavior => {
      let fail = true;
      const failure = new Error('Search unavailable');
      const { result } = renderHook(
        () =>
          useAsyncSearch<string>({
            query: 'q',
            search: () => {
              if (!fail) return ['recovered'];
              if (behavior === 'throw') throw failure;
              if (behavior === 'reject') return Promise.reject('Search unavailable');
              if (behavior === 'abort') throw new DOMException('Search unavailable', 'AbortError');
              return undefined as unknown as string[];
            }
          }),
        { wrapper }
      );
      await waitFor(() => expect(result.current.status).toBe('error'));
      expect(result.current.loading).toBe(false);
      expect(result.current.items).toEqual([]);
      expect(result.current.error?.message).toBe(
        behavior === 'invalid' ? 'Search must return an array of results.' : 'Search unavailable'
      );
      if (behavior === 'throw') expect(result.current.error).toBe(failure);
      fail = false;
      act(() => result.current.reload());
      expect(result.current.error).toBeNull();
      expect(result.current.loading).toBe(true);
      await waitFor(() => expect(result.current.items).toEqual(['recovered']));
    }
  );
});

type Job = AsyncSearchContext & {
  resolve(items: readonly string[]): void;
  reject(error: Error): void;
};

function deferredSearch() {
  const jobs: Job[] = [];
  const search = (context: AsyncSearchContext) =>
    new Promise<readonly string[]>((resolve, reject) => {
      jobs.push({ ...context, resolve, reject });
    });
  return { jobs, search };
}

describe('useAsyncSearch cancellation', () => {
  it.each(['resolve', 'reject'] as const)(
    'Should ignore a stale request that %ss',
    async settlement => {
      const { jobs, search } = deferredSearch();
      const { result, rerender } = renderHook(({ query }) => useAsyncSearch({ query, search }), {
        initialProps: { query: 'old' },
        wrapper
      });
      await waitFor(() => expect(jobs).toHaveLength(1));
      rerender({ query: 'new' });
      await waitFor(() => expect(jobs).toHaveLength(2));
      expect(jobs[0].signal.aborted).toBe(true);
      await act(async () => jobs[1].resolve(['current']));
      await act(async () => {
        if (settlement === 'resolve') jobs[0].resolve(['stale']);
        else jobs[0].reject(new Error('Stale failure'));
      });
      expect(result.current.items).toEqual(['current']);
      expect(result.current.status).toBe('success');
      expect(result.current.error).toBeNull();
    }
  );

  it('Should abort a pending request when reloading the same query', async () => {
    const { jobs, search } = deferredSearch();
    const { result } = renderHook(() => useAsyncSearch({ query: 'q', search }), { wrapper });
    await waitFor(() => expect(jobs).toHaveLength(1));
    act(() => result.current.reload());
    await waitFor(() => expect(jobs).toHaveLength(2));
    expect(jobs[0].signal.aborted).toBe(true);
    await act(async () => jobs[0].resolve(['old']));
    expect(result.current.status).toBe('pending');
    expect(result.current.items).toEqual([]);
    await act(async () => jobs[1].resolve(['new']));
    expect(result.current.items).toEqual(['new']);
  });

  it('Should remain idle while disabled and start the latest query when enabled', async () => {
    const { jobs, search } = deferredSearch();
    const { result, rerender } = renderHook(
      ({ query, enabled }) => useAsyncSearch({ query, enabled, search }),
      { initialProps: { query: 'first', enabled: false }, wrapper }
    );
    act(() => result.current.reload());
    await act(async () => {});
    expect(result.current.status).toBe('idle');
    expect(result.current.loading).toBe(false);
    expect(jobs).toHaveLength(0);
    rerender({ query: 'latest', enabled: true });
    await waitFor(() => expect(jobs).toHaveLength(1));
    expect(jobs[0].query).toBe('latest');
    rerender({ query: 'latest', enabled: false });
    expect(jobs[0].signal.aborted).toBe(true);
    await act(async () => jobs[0].resolve(['disabled']));
    expect(result.current.items).toEqual([]);
    expect(result.current.status).toBe('idle');
    rerender({ query: 'latest', enabled: true });
    await waitFor(() => expect(jobs).toHaveLength(2));
    await act(async () => jobs[1].resolve(['enabled']));
    expect(result.current.items).toEqual(['enabled']);
  });

  it.each(['resolve', 'reject'] as const)(
    'Should ignore a request that %ss after unmount',
    async settlement => {
      const { jobs, search } = deferredSearch();
      const { result, unmount } = renderHook(() => useAsyncSearch({ query: '', search }), {
        wrapper
      });
      await waitFor(() => expect(jobs).toHaveLength(1));
      const before = result.current;
      unmount();
      expect(jobs[0].signal.aborted).toBe(true);
      await act(async () => {
        if (settlement === 'resolve') jobs[0].resolve(['unmounted']);
        else jobs[0].reject(new Error('Unmounted failure'));
      });
      expect(result.current).toBe(before);
      expect(console.error).not.toHaveBeenCalled();
    }
  );
});
