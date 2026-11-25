import React, { StrictMode, useLayoutEffect, useRef } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Toggle from '../Toggle';
import {
  ResetView,
  edit,
  expectCoherent,
  mountReset,
  recordObservation,
  scriptedReset,
  taskAndCommit,
  trustedEdit
} from './resetCoherenceTestUtils';

describe('Toggle reset boundaries', () => {
  it('TRC-15 preserves one effective subscription through observed StrictMode lifecycle', async () => {
    const onChange = vi.fn();
    const lifecycle: { phase: string; input: HTMLInputElement | null }[] = [];
    function Probe({ tick }: { tick: number }) {
      const root = useRef<HTMLDivElement>(null);
      useLayoutEffect(() => {
        lifecycle.push({ phase: 'setup', input: root.current?.querySelector('input') ?? null });
        return () => {
          lifecycle.push({ phase: 'cleanup', input: root.current?.querySelector('input') ?? null });
        };
      }, []);
      return (
        <div ref={root}>
          <ResetView tick={tick} defaultChecked onChange={onChange} />
        </div>
      );
    }
    const mounted = render(
      <StrictMode>
        <Probe tick={0} />
      </StrictMode>
    );
    const input = mounted.getByRole('switch') as HTMLInputElement;
    const form = input.form!;
    mounted.rerender(
      <StrictMode>
        <Probe tick={1} />
      </StrictMode>
    );
    mounted.rerender(
      <StrictMode>
        <Probe tick={2} />
      </StrictMode>
    );
    expect(mounted.getByRole('switch')).toBe(input);
    edit(input);
    await scriptedReset(form, 'TRC-15', input);
    expectCoherent(input, true);
    expect(onChange).toHaveBeenCalledTimes(1);
    await trustedEdit('TRC-15', input);
    expectCoherent(input, false);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(2, false, expect.any(Object));
    expect(onChange.mock.calls[1][1].target).toBe(input);
    expect(onChange.mock.calls[1][1].nativeEvent.isTrusted).toBe(true);
    mounted.unmount();
    await scriptedReset(form, 'TRC-15', input);
    expect(onChange).toHaveBeenCalledTimes(2);
    recordObservation('TRC-15', {
      lifecycle: lifecycle.map(item => ({
        phase: item.phase,
        sameInput: item.input === input,
        inputPresent: item.input !== null
      })),
      inputDisconnectedAfterUnmount: !input.isConnected,
      userCallbacks: onChange.mock.calls.map(call => call[0])
    });
    expect(lifecycle.some(item => item.phase === 'setup')).toBe(true);
    expect(lifecycle.some(item => item.phase === 'cleanup')).toBe(true);
  });

  it('TRC-16 leaves no-form input inert when another form resets', async () => {
    const onChange = vi.fn();
    const mounted = render(
      <div>
        <form id="other" />
        <Toggle
          name="choice"
          defaultChecked
          checkedChildren="ON"
          unCheckedChildren="OFF"
          onChange={onChange}
        />
      </div>
    );
    const input = mounted.getByRole('switch') as HTMLInputElement;
    expect(input.form).toBeNull();
    edit(input);
    await scriptedReset(mounted.container.querySelector('form')!, 'TRC-16', input);
    expectCoherent(input, false);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('TRC-17 reads latest native checked after multiple resets and intervening activation', async () => {
    const { form, input, onChange } = mountReset(true);
    edit(input);
    act(() => {
      form.reset();
      form.reset();
      fireEvent.click(input);
    });
    const latestNativeChecked = input.checked;
    const callbacksBeforeDelivery = onChange.mock.calls.length;
    recordObservation('TRC-17', { latestNativeChecked, callbacksBeforeDelivery });
    expect(latestNativeChecked).toBe(false);
    await taskAndCommit('TRC-17', input);
    expectCoherent(input, latestNativeChecked);
    expect(onChange).toHaveBeenCalledTimes(callbacksBeforeDelivery);
  });

  it('TRC-18 synchronizes while readOnly loading or disabled without weakening locked clicks', async () => {
    for (const lockedProp of ['readOnly', 'loading', 'disabled'] as const) {
      const { mounted, form, input, onChange } = mountReset(true);
      const onClick = vi.fn();
      edit(input);
      mounted.rerender(
        <ResetView
          defaultChecked
          onChange={onChange}
          onClick={onClick}
          {...{ [lockedProp]: true }}
        />
      );
      recordObservation('TRC-18', { phase: 'locked-variant-start', lockedProp });
      await scriptedReset(form, 'TRC-18', input);
      expectCoherent(input, true);
      if (lockedProp === 'disabled') {
        act(() => input.click());
      } else {
        edit(input);
      }
      expectCoherent(input, true);
      expect(onChange).toHaveBeenCalledTimes(1);
      if (lockedProp !== 'disabled') {
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick.mock.calls[0][0].defaultPrevented).toBe(true);
      }
      mounted.rerender(<ResetView defaultChecked onChange={onChange} onClick={onClick} />);
      await trustedEdit('TRC-18', input);
      expectCoherent(input, false);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenNthCalledWith(2, false, expect.any(Object));
      expect(onChange.mock.calls[1][1].target).toBe(input);
      expect(onChange.mock.calls[1][1].nativeEvent.isTrusted).toBe(true);
      recordObservation('TRC-18', {
        phase: 'unlocked-trusted-edit-complete',
        lockedProp,
        userCallbacks: onChange.mock.calls.map(call => call[0])
      });
      mounted.unmount();
    }
  });

  it('TRC-19 fences pending reset at unsupported lifetime mode boundaries', async () => {
    const { mounted, form, input, onChange } = mountReset(true);
    edit(input);
    const warningsBefore = vi.mocked(console.error).mock.calls.length;
    expect(warningsBefore).toBe(0);
    act(() => form.reset());
    mounted.rerender(<ResetView checked={false} defaultChecked onChange={onChange} />);
    await taskAndCommit('TRC-19', input);
    expectCoherent(input, false);
    expect(onChange).toHaveBeenCalledTimes(1);
    act(() => form.reset());
    mounted.rerender(<ResetView defaultChecked onChange={onChange} />);
    await taskAndCommit('TRC-19', input);
    recordObservation('TRC-19', {
      qualification: 'Unsupported React lifetime mode switch; recorded boundary only',
      warnings: vi
        .mocked(console.error)
        .mock.calls.slice(warningsBefore)
        .map(call => call.map(String)),
      checked: input.checked,
      ariaChecked: input.getAttribute('aria-checked'),
      dataChecked: input.closest('.rs-toggle')?.getAttribute('data-checked'),
      userCallbacks: onChange.mock.calls.map(call => call[0])
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    const warningCalls = vi.mocked(console.error).mock.calls.slice(warningsBefore);
    expect(
      warningCalls.every(call => /controlled|uncontrolled/i.test(call.map(String).join(' ')))
    ).toBe(true);
    // This warning belongs to the explicit unsupported mode probe, not a supported-mode guarantee.
    vi.mocked(console.error).mockClear();
  });

  it('TRC-20 observes parent layout resets on ordinary committed updates', async () => {
    const onChange = vi.fn();
    const inputsSeen: HTMLInputElement[] = [];
    function Parent({ tick }: { tick: number }) {
      const root = useRef<HTMLDivElement>(null);
      useLayoutEffect(() => {
        if (tick > 0) {
          const input = root.current!.querySelector<HTMLInputElement>('input')!;
          inputsSeen.push(input);
          input.form!.reset();
        }
      }, [tick]);
      return (
        <div ref={root}>
          <ResetView tick={tick} defaultChecked onChange={onChange} />
        </div>
      );
    }
    const mounted = render(<Parent tick={0} />);
    const input = mounted.getByRole('switch') as HTMLInputElement;
    edit(input);
    mounted.rerender(<Parent tick={1} />);
    expect(input.checked).toBe(true);
    await taskAndCommit('TRC-20', input);
    expectCoherent(input, true);
    edit(input);
    mounted.rerender(<Parent tick={2} />);
    await taskAndCommit('TRC-20', input);
    expectCoherent(input, true);
    expect(inputsSeen).toEqual([input, input]);
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
