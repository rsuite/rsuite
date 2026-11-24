import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MaskedInput, { MaskedInputProps } from '../MaskedInput';

const timeMask = [/\d/, /\d/, ':', /\d/, /\d/];
const modes = [
  { name: 'array mask', mask: timeMask, expected: '12:34', proposed: '56:78' },
  { name: 'function mask', mask: () => timeMask, expected: '12:34', proposed: '56:78' },
  { name: 'disabled mask', mask: false, expected: '1234', proposed: '5678' },
  { name: 'disabled function mask', mask: () => false as const, expected: '1234', proposed: '5678' }
] as const;

describe.each(modes)('MaskedInput controlled value ($name)', ({ mask, expected, proposed }) => {
  it('keeps a fixed value when there is no application change handler', () => {
    render(<MaskedInput mask={mask} value="1234" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(expected);
    fireEvent.change(input, { target: { value: '5678' } });
    expect(input).toHaveValue(expected);
  });

  it('reports the proposed masked value before restoring a rejected edit', () => {
    const onChange = vi.fn((value, event) => {
      expect(value).toBe(proposed);
      expect(event.target.value).toBe(proposed);
    });
    render(<MaskedInput mask={mask} value="1234" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '5678' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('textbox')).toHaveValue(expected);
  });

  it('applies a value accepted by the application', () => {
    function AcceptedInput() {
      const [value, setValue] = useState('1234');
      return <MaskedInput mask={mask} value={value} onChange={setValue} />;
    }
    render(<AcceptedInput />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '5678' } });
    expect(screen.getByRole('textbox')).toHaveValue(proposed);
  });

  it('retains uncontrolled edits through an unrelated render', () => {
    const view = render(<MaskedInput mask={mask} defaultValue="1234" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '5678' } });
    expect(screen.getByRole('textbox')).toHaveValue(proposed);
    view.rerender(<MaskedInput mask={mask} defaultValue="1234" placeholder="Updated" />);
    expect(screen.getByRole('textbox')).toHaveValue(proposed);
  });
});

describe('MaskedInput controlled updates', () => {
  it('keeps a numeric zero value when the application rejects an edit', () => {
    render(<MaskedInput mask={[/\d/, /\d/]} guide={false} value={0} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '12' } });
    expect(screen.getByRole('textbox')).toHaveValue('0');
  });

  it('restores an empty controlled value', () => {
    render(<MaskedInput mask={timeMask} value="" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1234' } });
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('restores a controlled value after the user clears it', () => {
    render(<MaskedInput mask={timeMask} value="1234" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
    expect(screen.getByRole('textbox')).toHaveValue('12:34');
  });

  it('accepts valid values and rejects later invalid values', () => {
    function ValidatedInput() {
      const [value, setValue] = useState('12:34');
      return (
        <MaskedInput
          mask={timeMask}
          value={value}
          onChange={next => {
            if (/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(next)) setValue(next);
          }}
        />
      );
    }
    render(<ValidatedInput />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '23:59' } });
    expect(input).toHaveValue('23:59');
    fireEvent.change(input, { target: { value: '25:87' } });
    expect(input).toHaveValue('23:59');
    fireEvent.change(input, { target: { value: '01:02' } });
    expect(input).toHaveValue('01:02');
  });

  it('keeps a piped controlled value after a rejected edit', () => {
    const pipe: MaskedInputProps['pipe'] = value => value.toUpperCase();
    render(<MaskedInput mask={[/[a-z]/i, /[a-z]/i]} value="ab" pipe={pipe} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'cd' } });
    expect(screen.getByRole('textbox')).toHaveValue('AB');
  });

  it('updates a disabled mask after rejected edits and later prop changes', () => {
    const view = render(<MaskedInput mask={false} value="first" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'rejected' } });
    expect(screen.getByRole('textbox')).toHaveValue('first');
    view.rerender(<MaskedInput mask={false} value="second" />);
    expect(screen.getByRole('textbox')).toHaveValue('second');
  });

  it('keeps controlled behavior with a custom render function and a forwarded ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <MaskedInput
        ref={ref}
        mask={timeMask}
        value="1234"
        render={(inputRef, props) => <input {...props} ref={inputRef} />}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '5678' } });
    expect(ref.current).toBe(screen.getByRole('textbox'));
    expect(ref.current).toHaveValue('12:34');
  });

  it('restores a rejected value in StrictMode', () => {
    render(
      <React.StrictMode>
        <MaskedInput mask={timeMask} value="1234" />
      </React.StrictMode>
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '5678' } });
    expect(screen.getByRole('textbox')).toHaveValue('12:34');
  });
});
