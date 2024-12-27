import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { testStandardProps, testControlledUnControlled, testFormControl } from '@test/utils';
import InputNumber from '../InputNumber';

describe('InputNumber', () => {
  testStandardProps(<InputNumber />, {
    sizes: ['lg', 'md', 'sm', 'xs']
  });

  testControlledUnControlled(InputNumber, {
    value: 1,
    defaultValue: 2,
    changedValue: 3,
    simulateEvent: {
      changeValue: () => {
        const input = screen.getByRole('textbox');
        userEvent.clear(input);
        userEvent.type(input, '4');
        return { changedValue: 4 };
      }
    },
    expectedValue: (value: number) => {
      expect(screen.getByRole('textbox')).to.value(value.toString());
    }
  });

  testFormControl(InputNumber, {
    value: 1,
    getUIElement: () => screen.getByRole('textbox')
  });

  it('Should render a input', () => {
    const { container } = render(<InputNumber />);
    expect(container.firstChild).to.have.class('rs-input-number');
  });

  it('Should output a subtle button', () => {
    render(<InputNumber />);
    expect(screen.getByRole('button', { name: /increment/i })).to.have.class('rs-btn-subtle');
  });

  it('Should render placeholder in input', () => {
    render(<InputNumber placeholder="abc" />);

    expect(screen.getByRole('textbox')).to.have.attr('placeholder', 'abc');
  });

  it('Should output a link button', () => {
    render(<InputNumber buttonAppearance="link" />);
    expect(screen.getByRole('button', { name: /increment/i })).to.have.class('rs-btn-link');
  });

  it('Should be disabled of down button', () => {
    render(<InputNumber min={10} value={10} />);
    expect(screen.getByRole('button', { name: /decrement/i })).to.have.property('disabled', true);
  });

  it('Should be disabled of up button', () => {
    render(<InputNumber max={10} value={10} />);
    expect(screen.getByRole('button', { name: /increment/i })).to.have.property('disabled', true);
  });

  it('Should render a prefix', () => {
    render(<InputNumber prefix={<i data-testid="prefix" />} />);

    expect(screen.getByTestId('prefix')).to.exist;
  });

  it('Should render a postfix', () => {
    render(<InputNumber postfix={<i data-testid="postfix" />} />);
    expect(screen.getByTestId('postfix')).to.exist;
  });

  it('Should render increment/decrement buttons', () => {
    render(<InputNumber />);

    expect(screen.getByRole('button', { name: /increment/i })).to.exist;
    expect(screen.getByRole('button', { name: /decrement/i })).to.exist;
  });

  it('Should call onChange callback with incremented value when increment button is clicked', () => {
    const onChange = sinon.spy();
    render(<InputNumber value={0} step={5} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));

    // fixme '5' or 5?
    expect(onChange).to.have.been.calledWith('5');
  });

  it('Should call onChange callback with decremented value when decrement button is clicked', () => {
    const onChange = sinon.spy();
    render(<InputNumber value={0} step={5} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /decrement/i }));

    // fixme '-5' or -5?
    expect(onChange).to.have.been.calledWith('-5');
  });

  it('Should call onChange callback with min value when increment button is clicked but initial value underflows', () => {
    const onChange = sinon.spy();
    render(<InputNumber value={0} min={10} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));

    // fixme '10' or 10?
    expect(onChange).to.have.been.calledWith('10');
  });

  it('Should call onChange callback with max value when decrement button is clicked but initial value overflows', () => {
    const onChange = sinon.spy();
    render(<InputNumber value={100} max={10} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /decrement/i }));

    // fixme '10' or 10?
    expect(onChange).to.have.been.calledWith('10');
  });

  it('Should call onChange callback when onblur', () => {
    const onChangeSpy = sinon.spy();
    render(<InputNumber onChange={onChangeSpy} />);
    const input = screen.getByRole('textbox');

    fireEvent.blur(input, { target: { value: 2 } });

    expect(onChangeSpy).to.be.calledOnce;
  });

  it('Should call onChange callback when onwheel', () => {
    const onChangeSpy = sinon.spy();
    render(<InputNumber onChange={onChangeSpy} />);
    const input = screen.getByRole('textbox');

    act(() => {
      input.focus();
      input.dispatchEvent(new WheelEvent('wheel', { deltaY: 10 }));
    });

    expect(onChangeSpy).to.be.calledOnce;

    act(() => {
      input.focus();
      input.dispatchEvent(new WheelEvent('wheel', { deltaY: -10 }));
    });

    expect(onChangeSpy).to.be.calledTwice;
  });

  it('Should call onWheel callback', () => {
    const onWheelSpy = sinon.spy();
    render(<InputNumber onWheel={onWheelSpy} />);
    const input = screen.getByRole('textbox');

    act(() => {
      input.focus();
      input.dispatchEvent(new WheelEvent('wheel', { deltaY: 10 }));
    });

    expect(onWheelSpy).to.be.calledOnce;
  });

  it('Should not call onWheel callback when `scrollable` is false', () => {
    const onWheelSpy = sinon.spy();
    render(<InputNumber onWheel={onWheelSpy} scrollable={false} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    input.focus();
    input.dispatchEvent(new WheelEvent('wheel', { deltaY: 10 }));

    expect(onWheelSpy).not.to.have.been.called;
  });

  it('Should call onChange callback when is control component', () => {
    const onChnageSpy = sinon.spy();
    render(<InputNumber onChange={onChnageSpy} value={2} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 3 } });

    expect(onChnageSpy).to.have.been.calledWith('3');
  });

  it('Should not call onChange callback when is not control component', () => {
    const onChnageSpy = sinon.spy();
    render(<InputNumber onChange={onChnageSpy} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 3 } });

    expect(onChnageSpy).to.called;
  });

  it('Should call onBlur callback', () => {
    const onBlurSpy = sinon.spy();
    render(<InputNumber onBlur={onBlurSpy} />);
    fireEvent.blur(screen.getByRole('textbox'));

    expect(onBlurSpy).to.called;
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    render(<InputNumber onFocus={onFocusSpy} />);
    fireEvent.focus(screen.getByRole('textbox'));
    expect(onFocusSpy).to.called;
  });

  it('Should format value', () => {
    render(<InputNumber value={1000} formatter={value => `$${value}`} />);
    expect(screen.getByRole('textbox')).to.have.value('$1000');

    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).to.have.value('1000');
  });

  describe('Plain text', () => {
    it('Should render input value', () => {
      render(
        <div data-testid="content">
          <InputNumber value={1} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('1');
    });

    it('Should render "Unfilled" if value is empty', () => {
      render(
        <div data-testid="content">
          <InputNumber value={null} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Unfilled');
    });
  });

  // @see https://www.w3.org/TR/wai-aria-practices-1.2/#textbox
  describe('Accessibility', () => {
    it('Should render an ARIA textbox', () => {
      render(<InputNumber value={0} />);

      expect(screen.getByRole('textbox')).to.exist;
    });

    it('Should not have focusable elements other than the input', () => {
      const { container } = render(<InputNumber value={0} />);

      // Move focus to the input
      userEvent.tab();

      // Move focus out
      userEvent.tab();

      expect(container).not.to.contain(document.activeElement);
    });

    describe('Keyboard interaction', () => {
      it('Should increase the value when ArrowUp is pressed', () => {
        const onChange = sinon.spy();
        render(<InputNumber value={0} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowUp' });
        expect(onChange).to.have.been.calledWith('1');
      });

      it('Should increase the value when ArrowDown is pressed', () => {
        const onChange = sinon.spy();
        render(<InputNumber value={0} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown' });
        expect(onChange).to.have.been.calledWith('-1');
      });

      it('Should set the value to minimum (if specified) when Home is pressed', () => {
        const onChange = sinon.spy();
        const { rerender } = render(<InputNumber value={10} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Home' });
        expect(onChange).not.to.have.been.called;

        rerender(<InputNumber value={10} min={0} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Home' });
        expect(onChange).to.have.been.calledWith('0');
      });

      it('Should set the value to maximum (if specified) when End is pressed', () => {
        const onChange = sinon.spy();
        const { rerender } = render(<InputNumber value={10} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'End' });
        expect(onChange).not.to.have.been.called;

        rerender(<InputNumber value={10} max={100} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'End' });
        expect(onChange).to.have.been.calledWith('100');
      });
    });
  });

  describe('Decimal separator', () => {
    it('Should render a decimal separator', () => {
      render(<InputNumber value={0.1} />);

      expect(screen.getByRole('textbox')).to.have.value('0.1');
    });

    it('Should render a decimal separator with a custom separator', () => {
      render(<InputNumber value={0.1} decimalSeparator="," />);

      expect(screen.getByRole('textbox')).to.have.value('0,1');
    });

    it('Should allow input of custom decimal separator', () => {
      const onChange = sinon.spy();

      render(<InputNumber decimalSeparator="," onChange={onChange} />);

      userEvent.type(screen.getByRole('textbox'), '1,2');
      fireEvent.blur(screen.getByRole('textbox'));

      expect(screen.getByRole('textbox')).to.have.value('1,2');
      expect(onChange.lastCall).to.have.been.calledWith('1.2');
    });
  });
});
