import React from 'react';
import userEvent from '@testing-library/user-event';
import NumberInput from '../NumberInput';
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { testStandardProps, testControlledUnControlled, testFormControl } from '@test/cases';

describe('NumberInput', () => {
  testStandardProps(<NumberInput />, {
    sizes: ['lg', 'md', 'sm', 'xs']
  });

  testControlledUnControlled(NumberInput, {
    value: 1,
    defaultValue: 2,
    changedValue: 3,
    simulateEvent: {
      changeValue: () => {
        const input = screen.getByRole('textbox');
        userEvent.clear(input);
        userEvent.type(input, '4');
        return { changedValue: '4' };
      }
    },
    expectedValue: (value: number | string) => {
      expect(screen.getByRole('textbox')).to.have.value(value.toString());
    }
  });

  testFormControl(NumberInput, {
    value: 1,
    getUIElement: () => screen.getByRole('textbox')
  });

  it('Should render a input', () => {
    const { container } = render(<NumberInput />);
    expect(container.firstChild).to.have.class('rs-number-input');
  });

  it('Should output a subtle button', () => {
    render(<NumberInput />);
    expect(screen.getByRole('button', { name: /increment/i })).to.have.class('rs-btn-subtle');
  });

  it('Should render placeholder in input', () => {
    render(<NumberInput placeholder="abc" />);

    expect(screen.getByRole('textbox')).to.have.attr('placeholder', 'abc');
  });

  it('Should output a link button', () => {
    render(<NumberInput buttonAppearance="link" />);
    expect(screen.getByRole('button', { name: /increment/i })).to.have.class('rs-btn-link');
  });

  it('Should be disabled of down button', () => {
    render(<NumberInput min={10} value={10} />);
    expect(screen.getByRole('button', { name: /decrement/i })).to.have.property('disabled', true);
  });

  it('Should be disabled of up button', () => {
    render(<NumberInput max={10} value={10} />);
    expect(screen.getByRole('button', { name: /increment/i })).to.have.property('disabled', true);
  });

  it('Should render a prefix', () => {
    render(<NumberInput prefix={<i data-testid="prefix" />} />);

    expect(screen.getByTestId('prefix')).to.exist;
  });

  it('Should render a postfix', () => {
    render(<NumberInput postfix={<i data-testid="postfix" />} />);
    expect(screen.getByTestId('postfix')).to.exist;
  });

  it('Should render a suffix', () => {
    render(<NumberInput suffix={<i data-testid="suffix" />} />);
    expect(screen.getByTestId('suffix')).to.exist;
  });

  it('Should support custom controls via function', () => {
    render(<NumberInput controls={trigger => <i data-testid={trigger} />} />);
    expect(screen.getByTestId('up')).to.exist;
    expect(screen.getByTestId('down')).to.exist;
  });

  it('Should hide control buttons when controls is false', () => {
    render(<NumberInput controls={false} />);
    expect(screen.queryByRole('button', { name: /increment/i })).to.be.null;
    expect(screen.queryByRole('button', { name: /decrement/i })).to.be.null;
  });

  it('Should render custom control icons via function', () => {
    render(<NumberInput controls={trigger => <i data-testid={`icon-${trigger}`} />} />);
    expect(screen.getByTestId('icon-up')).to.exist;
    expect(screen.getByTestId('icon-down')).to.exist;
    const upBtn = screen.getByRole('button', { name: /increment/i });
    expect(upBtn).to.contain(screen.getByTestId('icon-up'));
  });

  it('Should render increment/decrement buttons', () => {
    render(<NumberInput />);

    expect(screen.getByRole('button', { name: /increment/i })).to.exist;
    expect(screen.getByRole('button', { name: /decrement/i })).to.exist;
  });

  it('Should call onChange callback with incremented value when increment button is clicked', () => {
    const onChange = vi.fn();
    render(<NumberInput value={0} step={5} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));

    // The callback is called with (value, event)
    expect(onChange).toHaveBeenCalledWith('5', expect.any(Object));
  });

  it('Should call onChange callback with decremented value when decrement button is clicked', () => {
    const onChange = vi.fn();
    render(<NumberInput value={0} step={5} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /decrement/i }));

    // The callback is called with (value, event)
    expect(onChange).toHaveBeenCalledWith('-5', expect.any(Object));
  });

  it('Should call onChange callback with min value when increment button is clicked but initial value underflows', () => {
    const onChange = vi.fn();
    render(<NumberInput value={0} min={10} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));

    // The callback is called with (value, event)
    expect(onChange).toHaveBeenCalledWith('10', expect.any(Object));
  });

  it('Should call onChange callback with max value when decrement button is clicked but initial value overflows', () => {
    const onChange = vi.fn();
    render(<NumberInput value={100} max={10} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /decrement/i }));

    // The callback is called with (value, event)
    expect(onChange).toHaveBeenCalledWith('10', expect.any(Object));
  });

  it('Should call onChange callback when onblur', () => {
    const onChange = vi.fn();
    render(<NumberInput onChange={onChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.blur(input, { target: { value: 2 } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should call onChange callback when onwheel', () => {
    const onChange = vi.fn();
    render(<NumberInput value={0} onChange={onChange} />);
    const input = screen.getByRole('textbox');

    // Focus the input first
    act(() => {
      input.focus();
    });

    // Trigger wheel down
    act(() => {
      const wheelEvent = new WheelEvent('wheel', { deltaY: 1 });
      input.dispatchEvent(wheelEvent);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('-1', expect.any(Object));
    onChange.mockClear();

    // Trigger wheel up
    act(() => {
      const wheelEvent = new WheelEvent('wheel', { deltaY: -1 });
      input.dispatchEvent(wheelEvent);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('1', expect.any(Object));
  });

  it('Should call onWheel callback', () => {
    const onWheel = vi.fn();
    render(<NumberInput onWheel={onWheel} />);
    const input = screen.getByRole('textbox');

    // Focus the input first
    act(() => {
      input.focus();
    });

    act(() => {
      const wheelEvent = new WheelEvent('wheel', { deltaY: 1 });
      input.dispatchEvent(wheelEvent);
    });

    expect(onWheel).toHaveBeenCalledTimes(1);
  });

  it('Should not call onWheel callback when `scrollable` is false', () => {
    const onWheel = vi.fn();
    render(<NumberInput onWheel={onWheel} scrollable={false} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    input.focus();
    input.dispatchEvent(new WheelEvent('wheel', { deltaY: 10 }));

    expect(onWheel).not.toHaveBeenCalled();
  });

  it('Should call onChange callback when is control component', () => {
    const onChnage = vi.fn();
    render(<NumberInput onChange={onChnage} value={2} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 3 } });

    expect(onChnage).toHaveBeenCalledWith('3', expect.any(Object));
  });

  it('Should not call onChange callback when is not control component', () => {
    const onChnage = vi.fn();
    render(<NumberInput onChange={onChnage} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 3 } });

    expect(onChnage).toHaveBeenCalled();
  });

  it('Should call onBlur callback', () => {
    const onBlur = vi.fn();
    render(<NumberInput onBlur={onBlur} />);
    fireEvent.blur(screen.getByRole('textbox'));

    expect(onBlur).toHaveBeenCalled();
  });

  it('Should call onFocus callback', () => {
    const onFocus = vi.fn();
    render(<NumberInput onFocus={onFocus} />);
    fireEvent.focus(screen.getByRole('textbox'));
    expect(onFocus).toHaveBeenCalled();
  });

  it('Should format value', () => {
    render(<NumberInput value={1000} formatter={value => `$${value}`} />);
    expect(screen.getByRole('textbox')).to.have.value('$1000');

    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).to.have.value('1000');
  });

  describe('Plain text', () => {
    it('Should render input value', () => {
      render(
        <div data-testid="content">
          <NumberInput value={1} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('1');
    });

    it('Should render "Unfilled" if value is empty', () => {
      render(
        <div data-testid="content">
          <NumberInput value={null} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Unfilled');
    });
  });

  // @see https://www.w3.org/TR/wai-aria-practices-1.2/#textbox
  describe('Accessibility', () => {
    it('Should render an ARIA textbox', () => {
      render(<NumberInput value={0} />);

      expect(screen.getByRole('textbox')).to.exist;
    });

    it('Should not have focusable elements other than the input', () => {
      const { container } = render(<NumberInput value={0} />);

      // Move focus to the input
      userEvent.tab();

      // Move focus out
      userEvent.tab();

      expect(container).not.to.contain(document.activeElement);
    });

    describe('Keyboard interaction', () => {
      it('Should increase the value when ArrowUp is pressed', () => {
        const onChange = vi.fn();
        render(<NumberInput value={0} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowUp' });
        expect(onChange).toHaveBeenCalledWith('1', expect.any(Object));
      });

      it('Should increase the value when ArrowDown is pressed', () => {
        const onChange = vi.fn();
        render(<NumberInput value={0} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown' });
        expect(onChange).toHaveBeenCalledWith('-1', expect.any(Object));
      });

      it('Should set the value to minimum (if specified) when Home is pressed', () => {
        const onChange = vi.fn();
        const { rerender } = render(<NumberInput value={10} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Home' });
        expect(onChange).not.toHaveBeenCalled();

        onChange.mockClear();
        rerender(<NumberInput value={10} min={0} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Home' });
        expect(onChange).toHaveBeenCalledWith('0', expect.any(Object));
      });

      it('Should set the value to maximum (if specified) when End is pressed', () => {
        const onChange = vi.fn();
        const { rerender } = render(<NumberInput value={10} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'End' });
        expect(onChange).not.toHaveBeenCalled();

        onChange.mockClear();
        rerender(<NumberInput value={10} max={100} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'End' });
        expect(onChange).toHaveBeenCalledWith('100', expect.any(Object));
      });
    });
  });

  describe('Decimal separator', () => {
    it('Should render a decimal separator', () => {
      render(<NumberInput value={0.1} />);

      expect(screen.getByRole('textbox')).to.have.value('0.1');
    });

    it('Should render a decimal separator with a custom separator', () => {
      render(<NumberInput value={0.1} decimalSeparator="," />);

      expect(screen.getByRole('textbox')).to.have.value('0,1');
    });

    it('Should allow input of custom decimal separator', () => {
      const onChange = vi.fn();

      render(<NumberInput decimalSeparator="," onChange={onChange} />);

      userEvent.type(screen.getByRole('textbox'), '1,2');
      fireEvent.blur(screen.getByRole('textbox'));

      expect(screen.getByRole('textbox')).to.have.value('1,2');
      expect(onChange.mock.lastCall?.[0]).toBe('1.2');
    });

    it('Should allow input of standard decimal point when custom separator is set', () => {
      const onChange = vi.fn();

      render(<NumberInput decimalSeparator="," onChange={onChange} />);

      userEvent.type(screen.getByRole('textbox'), '1.2');
      fireEvent.blur(screen.getByRole('textbox'));

      expect(screen.getByRole('textbox')).to.have.value('1,2');
      expect(onChange.mock.lastCall?.[0]).toBe('1.2');
    });

    it('Should allow input of both custom separator and standard decimal point', () => {
      const onChange = vi.fn();

      render(<NumberInput decimalSeparator=";" onChange={onChange} />);

      // Test with custom separator
      userEvent.type(screen.getByRole('textbox'), '1;5');
      fireEvent.blur(screen.getByRole('textbox'));

      expect(screen.getByRole('textbox')).to.have.value('1;5');
      expect(onChange.mock.lastCall?.[0]).toBe('1.5');

      // Clear input
      userEvent.clear(screen.getByRole('textbox'));
      onChange.mockClear();

      // Test with standard decimal point
      userEvent.type(screen.getByRole('textbox'), '2.5');
      fireEvent.blur(screen.getByRole('textbox'));

      expect(screen.getByRole('textbox')).to.have.value('2;5');
      expect(onChange.mock.lastCall?.[0]).toBe('2.5');
    });
  });

  it('Should not call onChange in readOnly mode (click, key, wheel)', () => {
    const onChange = vi.fn();
    const onWheel = vi.fn();
    render(<NumberInput value={1} readOnly onChange={onChange} onWheel={onWheel} />);
    const input = screen.getByRole('textbox');
    fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(onChange).not.toHaveBeenCalled();
    act(() => {
      input.focus();
      input.dispatchEvent(new WheelEvent('wheel', { deltaY: -10 }));
    });
    expect(onChange).not.toHaveBeenCalled();
    expect(onWheel).toHaveBeenCalled();
  });

  it('Should handle decimal step precision correctly', () => {
    const onChange = vi.fn();
    render(<NumberInput value={0.2} step={0.1} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith('0.3', expect.any(Object));
    onChange.mockClear();
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith('0.1', expect.any(Object));
  });
});
