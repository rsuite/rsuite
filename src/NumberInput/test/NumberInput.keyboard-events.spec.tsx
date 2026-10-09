import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NumberInput from '../NumberInput';

const steppingKeys = [
  ['ArrowUp', '6'],
  ['ArrowDown', '4'],
  ['Home', '0'],
  ['End', '10']
] as const;

function keyDown(input: HTMLElement, key: string, init: KeyboardEventInit = {}) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
  fireEvent(input, event);
  return event;
}

describe('NumberInput keyboard event ownership', () => {
  for (const mode of ['controlled', 'uncontrolled'] as const) {
    const valueProps = mode === 'controlled' ? { value: 5 } : { defaultValue: 5 };

    describe(mode, () => {
      for (const composition of ['isComposing', 'keyCode'] as const) {
        it.each(steppingKeys)(`preserves composing %s with ${composition}`, key => {
          const onChange = vi.fn();
          const onKeyDown = vi.fn();
          render(
            <NumberInput
              {...valueProps}
              min={0}
              max={10}
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
          );
          const input = screen.getByRole('textbox');
          const event = keyDown(
            input,
            key,
            composition === 'isComposing' ? { isComposing: true } : { keyCode: 229 }
          );

          expect(event[composition]).toBe(composition === 'isComposing' ? true : 229);
          expect(onChange).not.toHaveBeenCalled();
          expect(input).to.have.value('5');
          expect(event.defaultPrevented).toBe(false);
          expect(onKeyDown).toHaveBeenCalledTimes(1);
          expect(onKeyDown.mock.calls[0][0].nativeEvent).toBe(event);
        });
      }

      it.each(steppingKeys)('lets the caller cancel %s before stepping', key => {
        const onChange = vi.fn();
        const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLInputElement>) =>
          event.preventDefault()
        );
        render(
          <NumberInput {...valueProps} min={0} max={10} onChange={onChange} onKeyDown={onKeyDown} />
        );
        const input = screen.getByRole('textbox');
        const event = keyDown(input, key);

        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(event.defaultPrevented).toBe(true);
        expect(onChange).not.toHaveBeenCalled();
        expect(input).to.have.value('5');
      });
    });
  }

  it.each(steppingKeys)('forwards %s once before the ordinary value change', (key, value) => {
    const order: string[] = [];
    let currentTarget: EventTarget | null = null;
    const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLInputElement>) => {
      order.push('key');
      currentTarget = event.currentTarget;
    });
    const onChange = vi.fn(() => order.push('change'));
    render(
      <NumberInput defaultValue={5} min={0} max={10} onKeyDown={onKeyDown} onChange={onChange} />
    );
    const input = screen.getByRole('textbox');
    const event = keyDown(input, key);

    expect(order).toEqual(['key', 'change']);
    expect(currentTarget).toBe(input);
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.calls[0][0].nativeEvent).toBe(event);
    expect(onChange).toHaveBeenCalledWith(value, expect.any(Object));
    expect(input).to.have.value(value);
    expect(event.defaultPrevented).toBe(true);
  });

  it('forwards text-editing keys without consuming them', () => {
    const onKeyDown = vi.fn();
    const onChange = vi.fn();
    render(<NumberInput defaultValue={5} onKeyDown={onKeyDown} onChange={onChange} />);
    const event = keyDown(screen.getByRole('textbox'), 'ArrowLeft');
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('uses the current callback after rerendering', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(<NumberInput defaultValue={5} onKeyDown={first} />);
    keyDown(screen.getByRole('textbox'), 'ArrowLeft');
    rerender(<NumberInput defaultValue={5} onKeyDown={second} />);
    keyDown(screen.getByRole('textbox'), 'ArrowRight');
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });

  for (const blocked of ['disabled', 'readOnly'] as const) {
    it.each(steppingKeys)(`preserves the ${blocked} input event gate for %s`, key => {
      const onChange = vi.fn();
      const onKeyDown = vi.fn();
      render(
        <NumberInput
          defaultValue={5}
          min={0}
          max={10}
          {...{ [blocked]: true }}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      );
      const input = screen.getByRole('textbox');
      const event = keyDown(input, key);
      expect(onKeyDown).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      expect(input).to.have.value('5');
      expect(event.defaultPrevented).toBe(false);
    });
  }
});
