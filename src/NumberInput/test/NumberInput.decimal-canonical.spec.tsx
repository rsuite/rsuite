import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NumberInput from '../NumberInput';

const values = [
  {
    name: 'numeric value',
    value: -1.2,
    separator: '-',
    up: ['-1.1', '-1'],
    down: ['-1.3', '-1.4']
  },
  {
    name: 'negative string',
    value: '-1.2',
    separator: '-',
    up: ['-1.1', '-1'],
    down: ['-1.3', '-1.4']
  },
  { name: 'positive sign', value: '+1.2', separator: '+', up: ['1.3', '1.4'], down: ['1.1', '1'] },
  {
    name: 'exponent string',
    value: '1e2',
    separator: 'e',
    up: ['100.1', '100.2'],
    down: ['99.9', '99.8']
  }
];

describe.each(values)('NumberInput canonical $name', ({ value, separator, up, down }) => {
  it.each(['ArrowUp', 'ArrowDown'])(
    'preserves an already numeric value through repeated %s',
    key => {
      const onChange = vi.fn();
      render(
        <NumberInput
          defaultValue={value}
          decimalSeparator={separator}
          step={0.1}
          onChange={onChange}
        />
      );
      const input = screen.getByRole('textbox');
      for (const expected of key === 'ArrowUp' ? up : down) {
        onChange.mockClear();
        fireEvent.keyDown(input, { key });
        expect(onChange).toHaveBeenCalledExactlyOnceWith(expected, expect.any(Object));
        expect(input).to.have.value(expected.replace('.', separator));
      }
    }
  );

  it('preserves numeric bound comparisons without reinterpreting its notation', () => {
    render(
      <NumberInput
        defaultValue={value}
        decimalSeparator={separator}
        min={Number(value)}
        max={Number(value)}
      />
    );
    expect(screen.getByRole('button', { name: 'Increment' })).to.have.property('disabled', true);
    expect(screen.getByRole('button', { name: 'Decrement' })).to.have.property('disabled', true);
  });
});
