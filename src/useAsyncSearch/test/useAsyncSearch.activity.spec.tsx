import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useAsyncSearch from '..';

const Activity = (
  React as typeof React & {
    Activity?: React.ComponentType<{ mode: 'visible' | 'hidden'; children: React.ReactNode }>;
  }
).Activity;

describe.skipIf(!Activity)('useAsyncSearch with Activity', () => {
  it.each(['pending-resolve', 'pending-reject', 'success', 'error'] as const)(
    'Should restart %s state on reconnect and ignore the disconnected request',
    async initial => {
      const jobs: {
        signal: AbortSignal;
        resolve(items: string[]): void;
        reject(error: Error): void;
      }[] = [];
      function Probe() {
        const result = useAsyncSearch<string>({
          query: 'q',
          search: ({ signal }) =>
            new Promise((resolve, reject) => jobs.push({ signal, resolve, reject }))
        });
        return (
          <output>
            {[result.status, result.items.join(','), result.error?.message || ''].join(':')}
          </output>
        );
      }
      const Boundary = Activity!;
      const ui = (mode: 'visible' | 'hidden') => (
        <React.StrictMode>
          <Boundary mode={mode}>
            <Probe />
          </Boundary>
        </React.StrictMode>
      );
      const { rerender } = render(ui('visible'));
      await waitFor(() => expect(jobs).toHaveLength(1));
      if (initial === 'success') await act(async () => jobs[0].resolve(['previous']));
      if (initial === 'error') await act(async () => jobs[0].reject(new Error('Previous failure')));
      rerender(ui('hidden'));
      expect(jobs[0].signal.aborted).toBe(true);
      rerender(ui('visible'));
      await waitFor(() => expect(jobs).toHaveLength(2));
      expect(screen.getByText('pending::')).toBeTruthy();
      await act(async () => {
        if (initial === 'pending-resolve') jobs[0].resolve(['disconnected']);
        if (initial === 'pending-reject') jobs[0].reject(new Error('Disconnected failure'));
      });
      expect(screen.getByText('pending::')).toBeTruthy();
      await act(async () => jobs[1].resolve(['resumed']));
      expect(screen.getByText('success:resumed:')).toBeTruthy();
      expect(console.error).not.toHaveBeenCalled();
    }
  );

  it('Should keep a disabled search idle through hide and show', async () => {
    let calls = 0;
    function Probe() {
      const result = useAsyncSearch({
        query: '',
        enabled: false,
        search: () => {
          calls++;
          return [];
        }
      });
      return <output>{result.status}</output>;
    }
    const Boundary = Activity!;
    const ui = (mode: 'visible' | 'hidden') => (
      <Boundary mode={mode}>
        <Probe />
      </Boundary>
    );
    const { rerender } = render(ui('visible'));
    rerender(ui('hidden'));
    rerender(ui('visible'));
    await act(async () => {});
    expect(screen.getByText('idle')).toBeTruthy();
    expect(calls).toBe(0);
  });
});
