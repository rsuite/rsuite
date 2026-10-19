import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NumberInput, { NumberInputProps } from '../NumberInput';

const triggers = [
  'ArrowUp',
  'ArrowDown',
  'Increment',
  'Decrement',
  'WheelUp',
  'WheelDown'
] as const;
type StepTrigger = (typeof triggers)[number];

function Example({ controlled, ...props }: NumberInputProps & { controlled: boolean }) {
  const [value, setValue] = React.useState<string | number | null>(props.defaultValue ?? 0);
  return (
    <NumberInput
      {...props}
      {...(controlled ? { value } : {})}
      onChange={(nextValue, event) => {
        if (controlled) setValue(nextValue);
        props.onChange?.(nextValue, event);
      }}
    />
  );
}

function edit(input: HTMLElement, value: string) {
  act(() => input.focus());
  fireEvent.change(input, { target: { value } });
  expect(input).to.have.value(value);
}

function step(input: HTMLElement, trigger: StepTrigger) {
  if (trigger.startsWith('Arrow')) {
    fireEvent.keyDown(input, { key: trigger });
  } else if (trigger.startsWith('Wheel')) {
    fireEvent.wheel(input, { deltaY: trigger === 'WheelUp' ? -1 : 1 });
  } else {
    fireEvent.click(screen.getByRole('button', { name: trigger }));
  }
}

describe('NumberInput custom decimal interactions', () => {
  for (const controlled of [false, true]) {
    describe(controlled ? 'controlled' : 'uncontrolled', () => {
      for (const separator of [',', '+']) {
        it.each(triggers)(`steps a typed ${separator} decimal through %s before blur`, trigger => {
          const onChange = vi.fn();
          const onBlur = vi.fn();
          render(
            <Example
              controlled={controlled}
              defaultValue={0}
              decimalSeparator={separator}
              step={0.1}
              onChange={onChange}
              onBlur={onBlur}
            />
          );
          const input = screen.getByRole('textbox');
          const typedValue = `1${separator}2`;
          edit(input, typedValue);
          expect(onChange).toHaveBeenCalledExactlyOnceWith(typedValue, expect.any(Object));
          onChange.mockClear();

          step(input, trigger);

          const expected = ['ArrowUp', 'Increment', 'WheelUp'].includes(trigger) ? '1.3' : '1.1';
          expect(input).to.have.value(expected.replace('.', separator));
          expect(onChange).toHaveBeenCalledExactlyOnceWith(expected, expect.any(Object));
          expect(onBlur).not.toHaveBeenCalled();
        });

        for (const bound of ['min', 'max'] as const) {
          it(`updates the ${bound} button state for typed ${separator} decimals before blur`, () => {
            const onChange = vi.fn();
            render(
              <Example
                controlled={controlled}
                defaultValue={1.8}
                min={1.2}
                max={2.4}
                decimalSeparator={separator}
                onChange={onChange}
              />
            );
            const input = screen.getByRole('textbox');
            edit(input, (bound === 'min' ? '1.2' : '2.4').replace('.', separator));
            const button = screen.getByRole('button', {
              name: bound === 'min' ? 'Decrement' : 'Increment'
            });
            expect(button).to.have.property('disabled', true);
            onChange.mockClear();
            fireEvent.click(button);
            expect(onChange).not.toHaveBeenCalled();

            edit(input, `1${separator}8`);
            expect(screen.getByRole('button', { name: 'Increment' })).to.have.property(
              'disabled',
              false
            );
            expect(screen.getByRole('button', { name: 'Decrement' })).to.have.property(
              'disabled',
              false
            );
          });
        }

        it.each([
          ['ArrowUp', '1.15', '1.2'],
          ['ArrowDown', '-1.15', '-1.2']
        ] as const)(
          `clamps %s after parsing a typed ${separator} decimal`,
          (key, value, expected) => {
            const onChange = vi.fn();
            render(
              <Example
                controlled={controlled}
                defaultValue={0}
                min={-1.2}
                max={1.2}
                step={0.1}
                decimalSeparator={separator}
                onChange={onChange}
              />
            );
            const input = screen.getByRole('textbox');
            edit(input, value.replace('.', separator));
            onChange.mockClear();
            step(input, key);
            expect(input).to.have.value(expected.replace('.', separator));
            expect(onChange).toHaveBeenCalledExactlyOnceWith(expected, expect.any(Object));
          }
        );
      }
    });
  }

  for (const separator of [undefined, ',']) {
    it.each(triggers)(
      `preserves standard decimal input with separator ${separator} through %s`,
      trigger => {
        const onChange = vi.fn();
        render(
          <NumberInput
            defaultValue={0}
            decimalSeparator={separator}
            step={0.1}
            onChange={onChange}
          />
        );
        const input = screen.getByRole('textbox');
        edit(input, '1.2'.replace('.', separator || '.'));
        // Keep the stored value in standard notation even when its display uses a custom separator.
        fireEvent.change(input, { target: { value: '1.2' } });
        onChange.mockClear();
        step(input, trigger);
        const expected = ['ArrowUp', 'Increment', 'WheelUp'].includes(trigger) ? '1.3' : '1.1';
        expect(input).to.have.value(expected.replace('.', separator || '.'));
        expect(onChange).toHaveBeenCalledExactlyOnceWith(expected, expect.any(Object));
      }
    );
  }

  it.each([',', '+'])('uses the current separator after a prop update from %s', separator => {
    const onChange = vi.fn();
    const { rerender } = render(
      <NumberInput
        value={`1${separator}2`}
        decimalSeparator={separator}
        onChange={onChange}
        step={0.1}
      />
    );
    rerender(<NumberInput value="1;2" decimalSeparator=";" onChange={onChange} step={0.1} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith('1.3', expect.any(Object));
  });
});
