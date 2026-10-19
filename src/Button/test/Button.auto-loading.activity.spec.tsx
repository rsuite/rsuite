import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from '..';

const Activity = (
  React as typeof React & {
    Activity?: React.ComponentType<{ mode: 'visible' | 'hidden'; children: React.ReactNode }>;
  }
).Activity;

describe.skipIf(!Activity)('Button automatic loading with Activity', () => {
  it.each(['pending', 'resolve', 'reject'])(
    'reconciles a %s task when effects reconnect',
    async mode => {
      let resolve!: () => void;
      let reject!: (error: unknown) => void;
      const promise = new Promise<void>((yes, no) => {
        resolve = yes;
        reject = no;
      });
      const onClick = vi.fn(() => promise);
      const onError = vi.fn();
      const Boundary = Activity!;
      const ui = (visible: boolean) => (
        <React.StrictMode>
          <Boundary mode={visible ? 'visible' : 'hidden'}>
            <Button autoLoading onClick={onClick} onClickError={onError}>
              Save
            </Button>
          </Boundary>
        </React.StrictMode>
      );
      const { rerender } = render(ui(true));
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(button.getAttribute('aria-busy')).toBe('true');
      rerender(ui(false));
      await act(async () => {
        if (mode === 'resolve') resolve();
        if (mode === 'reject') reject('hidden failure');
      });
      rerender(ui(true));
      expect(screen.getByRole('button')).toBe(button);
      expect(button.getAttribute('aria-busy')).toBe(mode === 'pending' ? 'true' : null);
      expect(onError).toHaveBeenCalledTimes(mode === 'reject' ? 1 : 0);
      if (mode === 'pending') {
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
        await act(async () => resolve());
        expect(button.getAttribute('aria-busy')).toBe(null);
      }
      expect(console.error).not.toHaveBeenCalled();
    }
  );
});
