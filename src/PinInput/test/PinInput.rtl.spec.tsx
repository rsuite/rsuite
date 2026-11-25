import React from 'react';
import { act, render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PinInput from '../PinInput';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';
import '../../Stack/styles/index.scss';

type Direction = 'ltr' | 'rtl';
const originalDocumentDir = document.documentElement.getAttribute('dir');
const originalBodyDir = document.body.getAttribute('dir');
afterEach(() => {
  for (const [element, value] of [
    [document.documentElement, originalDocumentDir],
    [document.body, originalBodyDir]
  ] as const) {
    if (value === null) element.removeAttribute('dir');
    else element.setAttribute('dir', value);
  }
});

interface Layout {
  name: string;
  direction: Direction;
  documentDir?: Direction;
  hostDir?: Direction;
  inputDir?: Direction;
  styleDir?: Direction;
  providerRTL?: boolean;
}
const layouts: Layout[] = [
  { name: 'local RTL inside LTR document', direction: 'rtl', hostDir: 'rtl', providerRTL: false },
  { name: 'document RTL', direction: 'rtl', documentDir: 'rtl' },
  {
    name: 'component RTL overrides LTR host',
    direction: 'rtl',
    hostDir: 'ltr',
    inputDir: 'rtl',
    providerRTL: false
  },
  {
    name: 'local LTR overrides RTL document and provider',
    direction: 'ltr',
    documentDir: 'rtl',
    hostDir: 'ltr',
    providerRTL: true
  },
  { name: 'LTR layout with RTL provider', direction: 'ltr', hostDir: 'ltr', providerRTL: true },
  {
    name: 'inline RTL style overrides LTR host',
    direction: 'rtl',
    hostDir: 'ltr',
    styleDir: 'rtl',
    providerRTL: false
  }
];
const localLayout = (direction: Direction): Layout => ({
  name: direction,
  direction,
  hostDir: direction
});

function fixture(
  layout: Layout,
  mask = false,
  controlled = false,
  props: { disabled?: boolean; readOnly?: boolean; length?: number; cancel?: boolean } = {}
) {
  document.documentElement.dir = layout.documentDir || 'ltr';
  document.body.removeAttribute('dir');
  const onChange = vi.fn();
  const onComplete = vi.fn();
  const onKeyDown = vi.fn();
  const { container } = render(
    <div data-testid="pin-host" dir={layout.hostDir}>
      <CustomProvider rtl={layout.providerRTL}>
        <form>
          <button type="button" data-pin-start>
            Before code
          </button>
          <PinInput
            name="pin"
            mask={mask}
            length={props.length}
            disabled={props.disabled}
            readOnly={props.readOnly}
            dir={layout.inputDir}
            style={layout.styleDir ? { direction: layout.styleDir } : undefined}
            {...(controlled ? { value: '1234' } : { defaultValue: '1234' })}
            onChange={onChange}
            onComplete={onComplete}
            onKeyDown={onKeyDown}
            onKeyDownCapture={props.cancel ? event => event.preventDefault() : undefined}
          />
          <button type="button" data-pin-end>
            After code
          </button>
        </form>
      </CustomProvider>
    </div>
  );
  const inputs = Array.from(container.querySelectorAll<HTMLInputElement>('.rs-pin-input-segment'));
  const host = container.querySelector<HTMLElement>('[data-testid="pin-host"]')!;
  const form = container.querySelector<HTMLFormElement>('form')!;
  const value = inputs.map(input => input.value).join('');
  return { inputs, host, form, value, onChange, onComplete, onKeyDown };
}

function expectLayout(state: ReturnType<typeof fixture>, direction: Direction) {
  expect(getComputedStyle(state.inputs[0].parentElement!).direction).toBe(direction);
  if (state.inputs.length > 1) {
    const positions = state.inputs.map(input => input.getBoundingClientRect().x);
    for (let index = 1; index < positions.length; index++) {
      expect(
        direction === 'rtl'
          ? positions[index] < positions[index - 1]
          : positions[index] > positions[index - 1]
      ).toBe(true);
    }
  }
}
function expectUnchanged(state: ReturnType<typeof fixture>) {
  expect(state.inputs.map(input => input.value).join('')).toBe(state.value);
  expect(new FormData(state.form).get('pin')).toBe(state.inputs[0].disabled ? null : state.value);
  expect(state.form.querySelector<HTMLInputElement>('input[type="hidden"]')!.value).toBe(
    state.value
  );
  expect(state.onChange).not.toHaveBeenCalled();
  expect(state.onComplete).not.toHaveBeenCalled();
}
async function arrow(state: ReturnType<typeof fixture>, index: number, key: string) {
  act(() => state.inputs[index].focus());
  await act(async () => userEvent.keyboard(`{${key}}`));
  const event = state.onKeyDown.mock.lastCall![0].nativeEvent as KeyboardEvent;
  expect(event.isTrusted).toBe(true);
  return event;
}
function physicalNeighbor(state: ReturnType<typeof fixture>, index: number, key: string) {
  const current = state.inputs[index].getBoundingClientRect().x;
  const candidates = state.inputs
    .map(input => ({ input, x: input.getBoundingClientRect().x }))
    .filter(item => (key === 'ArrowLeft' ? item.x < current : item.x > current))
    .sort((a, b) => Math.abs(a.x - current) - Math.abs(b.x - current));
  return candidates[0]?.input || state.inputs[index];
}

describe.each(layouts)('PinInput physical navigation: $name', layout => {
  describe.each([false, true])('mask=%s', mask => {
    describe.each([false, true])('controlled=%s', controlled => {
      it.each(['ArrowLeft', 'ArrowRight'])('moves toward %s without editing', async key => {
        const state = fixture(layout, mask, controlled);
        expectLayout(state, layout.direction);
        const expected = physicalNeighbor(state, 1, key);
        const event = await arrow(state, 1, key);
        expect(document.activeElement).toBe(expected);
        expect(event.defaultPrevented).toBe(false);
        expect(state.onKeyDown).toHaveBeenCalledTimes(1);
        expectUnchanged(state);
      });
    });
  });
});

describe.each(['ltr', 'rtl'] as const)('PinInput directional boundaries (%s)', direction => {
  describe.each([false, true])('mask=%s', mask => {
    it.each(['left', 'right'])('stays at the physical %s edge', async edge => {
      const state = fixture(localLayout(direction), mask);
      expectLayout(state, direction);
      const ordered = [...state.inputs].sort(
        (a, b) => a.getBoundingClientRect().x - b.getBoundingClientRect().x
      );
      const index = state.inputs.indexOf(
        edge === 'left' ? ordered[0] : ordered[ordered.length - 1]
      );
      await arrow(state, index, edge === 'left' ? 'ArrowLeft' : 'ArrowRight');
      expect(document.activeElement).toBe(state.inputs[index]);
      expectUnchanged(state);
    });
    it('reads a changed ancestor direction without a React render', async () => {
      const state = fixture(localLayout(direction), mask);
      let expected = physicalNeighbor(state, 1, 'ArrowLeft');
      await arrow(state, 1, 'ArrowLeft');
      expect(document.activeElement).toBe(expected);
      const next = direction === 'ltr' ? 'rtl' : 'ltr';
      act(() => {
        state.host.dir = next;
      });
      expectLayout(state, next);
      expected = physicalNeighbor(state, 1, 'ArrowLeft');
      await arrow(state, 1, 'ArrowLeft');
      expect(document.activeElement).toBe(expected);
      expect(state.onKeyDown).toHaveBeenCalledTimes(2);
      expectUnchanged(state);
    });
    it('honors capture cancellation of a trusted arrow', async () => {
      const state = fixture(localLayout(direction), mask, false, { cancel: true });
      const event = await arrow(state, 1, 'ArrowLeft');
      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(state.inputs[1]);
      expect(state.onKeyDown).toHaveBeenCalledTimes(1);
      expectUnchanged(state);
    });
    it.each(['ArrowLeft', 'ArrowRight'])(
      'keeps readonly focus and values unchanged on %s',
      async key => {
        const state = fixture(localLayout(direction), mask, false, { readOnly: true });
        expectLayout(state, direction);
        await arrow(state, 1, key);
        expect(document.activeElement).toBe(state.inputs[1]);
        expect(state.inputs.every(input => input.readOnly)).toBe(true);
        expect(state.onKeyDown).toHaveBeenCalledTimes(1);
        expectUnchanged(state);
      }
    );
    it('skips disabled segments in native tab order and does not dispatch their arrows', async () => {
      const state = fixture(localLayout(direction), mask, false, { disabled: true });
      await act(async () => {
        await userEvent.click(state.form.querySelector<HTMLButtonElement>('[data-pin-start]')!);
        await userEvent.keyboard('{Tab}{ArrowLeft}');
      });
      expect(document.activeElement).toBe(state.form.querySelector('[data-pin-end]'));
      expect(state.inputs).not.toContain(document.activeElement);
      expect(state.inputs.every(input => input.disabled)).toBe(true);
      expect(state.onKeyDown).not.toHaveBeenCalled();
      expectUnchanged(state);
    });
    it.each(['ArrowLeft', 'ArrowRight'])('keeps a single segment focused on %s', async key => {
      const state = fixture(localLayout(direction), mask, false, { length: 1 });
      await arrow(state, 0, key);
      expect(document.activeElement).toBe(state.inputs[0]);
      expectUnchanged(state);
    });
  });
  describe.each(['isComposing', 'keyCode'] as const)('composition: %s', signal => {
    it.each(['ArrowLeft', 'ArrowRight'])('leaves focus unchanged on %s', key => {
      const state = fixture(localLayout(direction));
      act(() => state.inputs[1].focus());
      const event = new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true,
        ...(signal === 'isComposing' ? { isComposing: true } : { keyCode: 229 })
      });
      act(() => state.inputs[1].dispatchEvent(event));
      expect(document.activeElement).toBe(state.inputs[1]);
      expect(event.defaultPrevented).toBe(false);
      expect(state.onKeyDown).toHaveBeenCalledTimes(1);
      expect(state.onKeyDown.mock.lastCall![0].nativeEvent).toBe(event);
      expectUnchanged(state);
    });
  });
});
