import React, { useRef, useState } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DateInput from '..';
import DateRangeInput from '../../DateRangeInput';
import { useInputSelection } from '../utils';

function Echo({
  component: Component,
  controlled,
  onChange,
  ...props
}: {
  component: React.ElementType;
  controlled: boolean;
  onChange: (value: any, event: React.SyntheticEvent) => void;
  [key: string]: any;
}) {
  const [value, setValue] = useState<any>(props.defaultValue ?? null);
  return (
    <Component
      {...props}
      {...(controlled ? { value } : {})}
      onChange={(value, event) => {
        onChange(value, event);
        if (controlled) setValue(value);
      }}
    />
  );
}

const cases = [
  {
    name: 'DateInput',
    component: DateInput,
    format: 'yyyy-MM-dd',
    keys: '20240101',
    finalValue: '2024-01-01',
    finalRange: [8, 10],
    changes: 8
  },
  {
    name: 'DateRangeInput',
    component: DateRangeInput,
    format: 'MM/dd/yyyy',
    keys: '0101202402022024',
    finalValue: '01/01/2024 ~ 02/02/2024',
    finalRange: [19, 23],
    changes: 16
  }
];

describe('DateInput committed selection', () => {
  for (const scenario of cases) {
    for (const controlled of [false, true]) {
      it(`${scenario.name} ${controlled ? 'controlled' : 'uncontrolled'} keeps logical selection before Android RAF`, async () => {
        const userAgent = vi
          .spyOn(navigator, 'userAgent', 'get')
          .mockReturnValue('Mozilla/5.0 Android');
        try {
          const onChange = vi.fn();
          render(
            <Echo
              component={scenario.component}
              controlled={controlled}
              onChange={onChange}
              format={scenario.format}
            />
          );
          const input = screen.getByRole('textbox') as HTMLInputElement;
          expect(input.dataset.test).toBeUndefined();
          input.focus();
          fireEvent.click(input);
          // Dispatch separate discrete events without waiting for a frame between them.
          for (const key of scenario.keys) fireEvent.keyDown(input, { key });
          expect(input.value).toBe(scenario.finalValue);
          expect(onChange).toHaveBeenCalledTimes(scenario.changes);
          await waitFor(() =>
            expect([input.selectionStart, input.selectionEnd]).toEqual(scenario.finalRange)
          );
          expect(document.activeElement).toBe(input);
        } finally {
          userAgent.mockRestore();
        }
      });

      it(`${scenario.name} ${controlled ? 'controlled' : 'uncontrolled'} cancels Android selection with the same observed range after blur and refocus`, () => {
        const userAgent = vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Android');
        const frames: FrameRequestCallback[] = [];
        const animationFrame = vi
          .spyOn(window, 'requestAnimationFrame')
          .mockImplementation(callback => {
            frames.push(callback);
            return frames.length;
          });
        try {
          const onChange = vi.fn();
          const focusEvents: boolean[] = [];
          const blurEvents: boolean[] = [];
          const defaultValue =
            scenario.name === 'DateInput'
              ? new Date(2024, 0, 1)
              : [new Date(2024, 0, 1), new Date(2024, 0, 2)];
          render(
            <Echo
              component={scenario.component}
              controlled={controlled}
              onChange={onChange}
              defaultValue={defaultValue}
              format={scenario.format}
              onFocus={(event: React.FocusEvent) => focusEvents.push(event.isTrusted)}
              onBlur={(event: React.FocusEvent) => blurEvents.push(event.isTrusted)}
            />
          );
          const input = screen.getByRole('textbox') as HTMLInputElement;
          expect(input.dataset.test).toBeUndefined();
          act(() => input.focus());
          fireEvent.click(input);
          expect(frames.length).toBeGreaterThan(0);
          const value = input.value;
          const range = [input.selectionStart, input.selectionEnd];
          expect(range).not.toEqual(scenario.name === 'DateInput' ? [0, 4] : [0, 2]);
          const selection = vi.spyOn(input, 'setSelectionRange');

          // Both events are native DOM calls; the original observed range/value stay unchanged.
          act(() => {
            input.blur();
            input.focus();
          });
          expect(focusEvents).toEqual([true, true]);
          expect(blurEvents).toEqual([true]);
          expect(document.activeElement).toBe(input);
          expect(input.value).toBe(value);
          expect([input.selectionStart, input.selectionEnd]).toEqual(range);
          expect(onChange).not.toHaveBeenCalled();

          act(() => {
            while (frames.length) frames.splice(0).forEach(callback => callback(performance.now()));
          });
          expect(selection).not.toHaveBeenCalled();
          expect(input.value).toBe(value);
          expect([input.selectionStart, input.selectionEnd]).toEqual(range);
          expect(onChange).not.toHaveBeenCalled();
        } finally {
          animationFrame.mockRestore();
          userAgent.mockRestore();
        }
      });
    }
  }

  for (const controlled of [false, true]) {
    it(`DateInput ${controlled ? 'controlled' : 'uncontrolled'} advances across a month name with a changing width`, async () => {
      const onChange = vi.fn();
      render(
        <Echo
          component={DateInput}
          controlled={controlled}
          onChange={onChange}
          format="yyyy-MMMM-dd"
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.dataset.test).toBeUndefined();
      input.focus();
      fireEvent.click(input);
      for (const key of '2024901') fireEvent.keyDown(input, { key });
      expect(input.value).toBe('2024-September-01');
      expect(onChange).toHaveBeenCalledTimes(7);
      await waitFor(() => expect([input.selectionStart, input.selectionEnd]).toEqual([15, 17]));
      expect(onChange.mock.lastCall![0].getFullYear()).toBe(2024);
    });
    it(`DateRangeInput ${controlled ? 'controlled' : 'uncontrolled'} crosses into End after changing the width of the final Start month`, async () => {
      const onChange = vi.fn();
      render(
        <Echo
          component={DateRangeInput}
          controlled={controlled}
          onChange={onChange}
          format="dd MMMM"
          defaultValue={[new Date(2024, 0, 1), new Date(2024, 1, 2)]}
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.dataset.test).toBeUndefined();
      input.focus();
      fireEvent.click(input);
      fireEvent.keyDown(input, { key: 'ArrowRight' });
      for (const key of '93') fireEvent.keyDown(input, { key });
      expect(input.value).toBe('01 September ~ 03 February');
      expect(onChange).toHaveBeenCalledTimes(2);
      await waitFor(() => expect([input.selectionStart, input.selectionEnd]).toEqual([15, 17]));
      expect(onChange.mock.lastCall![0][0].getMonth()).toBe(8);
      expect(onChange.mock.lastCall![0][1].getMonth()).toBe(1);
      expect(onChange.mock.lastCall![0][1].getDate()).toBe(3);
    });
  }

  for (const component of [DateInput, DateRangeInput] as React.ElementType[]) {
    it(`${component === DateInput ? 'DateInput' : 'DateRangeInput'} keeps AM/PM selection before Android RAF`, async () => {
      const userAgent = vi
        .spyOn(navigator, 'userAgent', 'get')
        .mockReturnValue('Mozilla/5.0 Android');
      try {
        const onChange = vi.fn();
        const defaultValue =
          component === DateInput
            ? new Date(2024, 0, 1, 10, 30)
            : [new Date(2024, 0, 1, 10, 30), new Date(2024, 0, 1, 13, 45)];
        render(
          <Echo
            component={component}
            controlled
            onChange={onChange}
            format="hh:mm aa"
            defaultValue={defaultValue}
          />
        );
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.dataset.test).toBeUndefined();
        input.focus();
        fireEvent.click(input);
        for (const key of ['ArrowRight', 'ArrowRight', 'p', 'a']) fireEvent.keyDown(input, { key });
        expect(input.value).toBe(component === DateInput ? '10:30 AM' : '10:30 AM ~ 01:45 PM');
        expect(onChange).toHaveBeenCalledTimes(2);
        const first = onChange.mock.calls[0][0];
        const last = onChange.mock.lastCall![0];
        expect((Array.isArray(first) ? first[0] : first).getHours()).toBe(22);
        expect((Array.isArray(last) ? last[0] : last).getHours()).toBe(10);
        await waitFor(() => expect([input.selectionStart, input.selectionEnd]).toEqual([6, 8]));
      } finally {
        userAgent.mockRestore();
      }
    });
  }

  for (const action of ['Home', 'ref', 'blur', 'unmount'] as const) {
    it(`does not apply a queued Android range after ${action}`, async () => {
      const userAgent = vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Android');
      try {
        const { unmount } = render(
          <>
            <DateInput format="yyyy-MM-dd" defaultValue={new Date(2024, 0, 1)} />
            <button>Outside</button>
          </>
        );
        const input = screen.getByRole('textbox') as HTMLInputElement;
        input.focus();
        fireEvent.click(input);
        fireEvent.keyDown(input, { key: 'ArrowRight' });
        if (action === 'Home') {
          fireEvent.keyDown(input, { key: 'Home' });
          // fireEvent has no native caret action; model Home's resulting DOM range.
          input.setSelectionRange(0, 0);
        } else if (action === 'ref') {
          input.setSelectionRange(8, 10);
        } else if (action === 'blur') {
          screen.getByRole('button').focus();
        } else {
          unmount();
        }
        const range = [input.selectionStart, input.selectionEnd];
        const selection = vi.spyOn(input, 'setSelectionRange');
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
        expect(selection).not.toHaveBeenCalled();
        expect([input.selectionStart, input.selectionEnd]).toEqual(range);
        if (action === 'blur') expect(document.activeElement).toBe(screen.getByRole('button'));
        if (action === 'unmount') expect(input.isConnected).toBe(false);
      } finally {
        userAgent.mockRestore();
      }
    });
  }

  for (const unrelatedCommit of [false, true]) {
    it(`public Android setter ${unrelatedCommit ? 'does not cross a later value commit' : 'applies without a state update'}`, async () => {
      const userAgent = vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Android');
      try {
        function PublicSelection({ text }: { text: string }) {
          const input = useRef<HTMLInputElement>(null);
          const setSelection = useInputSelection(input);
          return (
            <input
              ref={input}
              value={text}
              onChange={() => {}}
              onKeyDown={() => setSelection(1, 3)}
            />
          );
        }
        const { rerender } = render(<PublicSelection text="abcde" />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        input.focus();
        fireEvent.keyDown(input, { key: 'F2' });
        // Logical request expiry occurs before Android's scheduled frame.
        await Promise.resolve();
        if (unrelatedCommit) rerender(<PublicSelection text="abcdefgh" />);
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
        expect([input.selectionStart, input.selectionEnd]).toEqual(
          unrelatedCommit ? [8, 8] : [1, 3]
        );
      } finally {
        userAgent.mockRestore();
      }
    });
  }

  it('public selection setter without a state update does not restore across an unrelated commit', async () => {
    function PublicSelection({ text }: { text: string }) {
      const input = useRef<HTMLInputElement>(null);
      const setSelection = useInputSelection(input);
      return (
        <input ref={input} value={text} onChange={() => {}} onKeyDown={() => setSelection(1, 3)} />
      );
    }
    const { rerender } = render(<PublicSelection text="abcde" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    input.focus();
    fireEvent.keyDown(input, { key: 'F2' });
    await waitFor(() => expect([input.selectionStart, input.selectionEnd]).toEqual([1, 3]));
    rerender(<PublicSelection text="abcdefgh" />);
    expect([input.selectionStart, input.selectionEnd]).toEqual([8, 8]);
  });
});
