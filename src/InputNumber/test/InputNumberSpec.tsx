import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import InputNumber from '../InputNumber';

describe('InputNumber', () => {
  testStandardProps(<InputNumber />);

  it('Should render a input', () => {
    const domNode = getDOMNode(<InputNumber />);
    assert.include(domNode.className, 'rs-input-number');
  });

  it('Should be disabled', () => {
    const domNode = getDOMNode(<InputNumber disabled />);
    assert.include(domNode.className, 'rs-input-group-disabled');
  });

  it('Should set size', () => {
    const instance = getDOMNode(<InputNumber size="lg" />);
    assert.include(instance.className, 'rs-input-group-lg');
  });

  it('Should output a subtle button', () => {
    render(<InputNumber />);
    expect(screen.getByRole('button', { name: /increment/i })).to.have.class('rs-btn-subtle');
  });

  it('Should render placeholder in input', () => {
    render(<InputNumber placeholder="abc" />);

    expect(screen.getByRole('spinbutton')).to.have.attr('placeholder', 'abc');
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
    const input = screen.getByRole('spinbutton');

    fireEvent.blur(input, { target: { value: 2 } });
    assert.isTrue(onChangeSpy.calledOnce);
  });

  it('Should call onChange callback when onwheel', () => {
    const onChangeSpy = sinon.spy();
    render(<InputNumber onChange={onChangeSpy} />);
    const input = screen.getByRole('spinbutton');

    act(() => {
      input.focus();
      input.dispatchEvent(new WheelEvent('wheel', { deltaY: 10 }));
    });

    assert.isTrue(onChangeSpy.calledOnce);

    act(() => {
      input.focus();
      input.dispatchEvent(new WheelEvent('wheel', { deltaY: -10 }));
    });

    assert.isTrue(onChangeSpy.calledTwice);
  });

  it('Should call onWheel callback', () => {
    const onWheelSpy = sinon.spy();
    render(<InputNumber onWheel={onWheelSpy} />);
    const input = screen.getByRole('spinbutton');

    act(() => {
      input.focus();
      input.dispatchEvent(new WheelEvent('wheel', { deltaY: 10 }));
    });

    assert.isTrue(onWheelSpy.calledOnce);
  });

  it('Should not call onWheel callback when `scrollable` is false', () => {
    const onWheelSpy = sinon.spy();
    render(<InputNumber onWheel={onWheelSpy} scrollable={false} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;

    input.focus();
    input.dispatchEvent(new WheelEvent('wheel', { deltaY: 10 }));

    expect(onWheelSpy).not.to.have.been.called;
  });

  it('Should call onChange callback when is control component', () => {
    const onChnageSpy = sinon.spy();
    render(<InputNumber onChange={onChnageSpy} value={2} />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: 3 } });

    expect(onChnageSpy).to.have.been.calledWith('3');
  });

  it('Should not call onChange callback when is not control component', () => {
    const onChnageSpy = sinon.spy();
    render(<InputNumber onChange={onChnageSpy} />);
    const input = screen.getByRole('spinbutton');

    fireEvent.change(input, { target: { value: 3 } });

    expect(onChnageSpy).to.called;
  });

  it('Should call onBlur callback', () => {
    const onBlurSpy = sinon.spy();
    render(<InputNumber onBlur={onBlurSpy} />);
    fireEvent.blur(screen.getByRole('spinbutton'));

    expect(onBlurSpy).to.called;
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    render(<InputNumber onFocus={onFocusSpy} />);
    fireEvent.focus(screen.getByRole('spinbutton'));
    expect(onFocusSpy).to.called;
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
          {/* FIXME `value` prop does not support `null` value */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <InputNumber value={null} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Unfilled');
    });
  });

  // @see https://www.w3.org/TR/wai-aria-practices-1.2/#spinbutton
  describe('a11y', () => {
    it('Should render an ARIA spinbutton', () => {
      render(<InputNumber value={0} />);

      expect(screen.getByRole('spinbutton')).to.exist;
    });

    it('Should not have focusable elements other than the input', () => {
      const { container } = render(<InputNumber value={0} />);

      // Move focus to the input
      userEvent.tab();

      // Move focus out
      userEvent.tab();

      // eslint-disable-next-line testing-library/no-node-access
      expect(container).not.to.contain(document.activeElement);
    });

    describe('Keyboard interaction', () => {
      it('Should increase the value when ArrowUp is pressed', () => {
        const onChange = sinon.spy();
        render(<InputNumber value={0} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'ArrowUp' });
        expect(onChange).to.have.been.calledWith('1');
      });

      it('Should increase the value when ArrowDown is pressed', () => {
        const onChange = sinon.spy();
        render(<InputNumber value={0} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'ArrowDown' });
        expect(onChange).to.have.been.calledWith('-1');
      });

      it('Should set the value to minimum (if specified) when Home is pressed', () => {
        const onChange = sinon.spy();
        const { rerender } = render(<InputNumber value={10} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'Home' });
        expect(onChange).not.to.have.been.called;

        rerender(<InputNumber value={10} min={0} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'Home' });
        expect(onChange).to.have.been.calledWith('0');
      });

      it('Should set the value to maximum (if specified) when End is pressed', () => {
        const onChange = sinon.spy();
        const { rerender } = render(<InputNumber value={10} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'End' });
        expect(onChange).not.to.have.been.called;

        rerender(<InputNumber value={10} max={100} onChange={onChange} />);

        fireEvent.keyDown(screen.getByRole('spinbutton'), { key: 'End' });
        expect(onChange).to.have.been.calledWith('100');
      });
    });
  });
});
