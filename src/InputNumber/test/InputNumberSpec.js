import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const instance = getDOMNode(<InputNumber />);
    assert.ok(instance.querySelector('.rs-input-number-touchspin-up.rs-btn-subtle'));
  });

  it('Should render placeholder in input', () => {
    const instance = getDOMNode(<InputNumber placeholder="abc" />);
    assert.equal(instance.querySelector('input').placeholder, 'abc');
  });

  it('Should output a link button', () => {
    const instance = getDOMNode(<InputNumber buttonAppearance="link" />);
    assert.ok(instance.querySelector('.rs-input-number-touchspin-up.rs-btn-link'));
  });

  it('Should be disabled of down button', () => {
    const instance = getDOMNode(<InputNumber min={10} value={10} />);
    assert.ok(instance.querySelector('.rs-input-number-touchspin-down.rs-btn-disabled'));
  });

  it('Should be disabled of up button', () => {
    const instance = getDOMNode(<InputNumber max={10} value={10} />);
    assert.ok(instance.querySelector('.rs-input-number-touchspin-up.rs-btn-disabled'));
  });

  it('Should render a prefix', () => {
    const instance = getDOMNode(<InputNumber prefix={<i />} />);
    assert.ok(instance.querySelector('.rs-input-group-addon i'));
  });

  it('Should render a postfix', () => {
    const instance = getDOMNode(<InputNumber postfix={<i />} />);
    assert.ok(instance.querySelector('.rs-input-group-addon i'));
  });

  it('Should render increment/decrement buttons', () => {
    const { getByRole } = render(<InputNumber />);

    expect(getByRole('button', { name: /increment/i })).to.exist;
    expect(getByRole('button', { name: /decrement/i })).to.exist;
  });

  it('Should call onChange callback with incremented value when increment button is clicked', () => {
    const onChange = sinon.spy();
    const { getByRole } = render(<InputNumber value={0} step={5} onChange={onChange} />);

    fireEvent.click(getByRole('button', { name: /increment/i }));

    // fixme '5' or 5?
    expect(onChange).to.have.been.calledWith('5');
  });

  it('Should call onChange callback with decremented value when decrement button is clicked', () => {
    const onChange = sinon.spy();
    const { getByRole } = render(<InputNumber value={0} step={5} onChange={onChange} />);

    fireEvent.click(getByRole('button', { name: /decrement/i }));

    // fixme '-5' or -5?
    expect(onChange).to.have.been.calledWith('-5');
  });

  it('Should call onChange callback with min value when increment button is clicked but initial value underflows', () => {
    const onChange = sinon.spy();
    const { getByRole } = render(<InputNumber value={0} min={10} onChange={onChange} />);

    fireEvent.click(getByRole('button', { name: /increment/i }));

    // fixme '10' or 10?
    expect(onChange).to.have.been.calledWith('10');
  });

  it('Should call onChange callback with max value when decrement button is clicked but initial value overflows', () => {
    const onChange = sinon.spy();
    const { getByRole } = render(<InputNumber value={100} max={10} onChange={onChange} />);

    fireEvent.click(getByRole('button', { name: /decrement/i }));

    // fixme '10' or 10?
    expect(onChange).to.have.been.calledWith('10');
  });

  it('Should call onChange callback when onblur', () => {
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChangeSpy} />);
    const input = instance.querySelector('.rs-input');

    fireEvent.blur(input, { target: { value: 2 } });
    assert.isTrue(onChangeSpy.calledOnce);
  });

  it('Should call onChange callback when onwheel', () => {
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChangeSpy} />);
    const input = instance.querySelector('.rs-input');

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
    const instance = getDOMNode(<InputNumber onWheel={onWheelSpy} />);
    const input = instance.querySelector('.rs-input');

    act(() => {
      input.focus();
      input.dispatchEvent(new WheelEvent('wheel', { deltaY: 10 }));
    });

    assert.isTrue(onWheelSpy.calledOnce);
  });

  it('Should call onChange callback when is control component', () => {
    const onChnageSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChnageSpy} value={2} />);
    const input = instance.querySelector('.rs-input');

    fireEvent.change(input, { target: { value: 3 } });

    expect(onChnageSpy).to.have.been.calledWith('3');
  });

  it('Should not call onChange callback when is not control component', () => {
    const onChnageSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChnageSpy} />);
    const input = instance.querySelector('.rs-input');

    fireEvent.change(input, { target: { value: 3 } });

    expect(onChnageSpy).to.called;
  });

  it('Should call onBlur callback', () => {
    const onBlurSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onBlur={onBlurSpy} />);
    fireEvent.blur(instance.querySelector('.rs-input'));

    expect(onBlurSpy).to.called;
  });

  it('Should call onFocus callback', () => {
    const onFocusSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onFocus={onFocusSpy} />);
    fireEvent.focus(instance.querySelector('.rs-input'));
    expect(onFocusSpy).to.called;
  });

  describe('Plain text', () => {
    it('Should render input value', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <InputNumber value={1} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('1');
    });

    it('Should render "Unfilled" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <InputNumber value={null} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Unfilled');
    });
  });

  // @see https://www.w3.org/TR/wai-aria-practices-1.2/#spinbutton
  describe('a11y', () => {
    it('Should render an ARIA spinbutton', () => {
      const { getByRole } = render(<InputNumber value={0} />);

      expect(getByRole('spinbutton')).to.exist;
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
        const { getByRole } = render(<InputNumber value={0} onChange={onChange} />);

        fireEvent.keyDown(getByRole('spinbutton'), { key: 'ArrowUp' });
        expect(onChange).to.have.been.calledWith('1');
      });

      it('Should increase the value when ArrowDown is pressed', () => {
        const onChange = sinon.spy();
        const { getByRole } = render(<InputNumber value={0} onChange={onChange} />);

        fireEvent.keyDown(getByRole('spinbutton'), { key: 'ArrowDown' });
        expect(onChange).to.have.been.calledWith('-1');
      });

      it('Should set the value to minimum (if specified) when Home is pressed', () => {
        const onChange = sinon.spy();
        const { getByRole, rerender } = render(<InputNumber value={10} onChange={onChange} />);

        fireEvent.keyDown(getByRole('spinbutton'), { key: 'Home' });
        expect(onChange).not.to.have.been.called;

        rerender(<InputNumber value={10} min={0} onChange={onChange} />);

        fireEvent.keyDown(getByRole('spinbutton'), { key: 'Home' });
        expect(onChange).to.have.been.calledWith('0');
      });

      it('Should set the value to maximum (if specified) when End is pressed', () => {
        const onChange = sinon.spy();
        const { getByRole, rerender } = render(<InputNumber value={10} onChange={onChange} />);

        fireEvent.keyDown(getByRole('spinbutton'), { key: 'End' });
        expect(onChange).not.to.have.been.called;

        rerender(<InputNumber value={10} max={100} onChange={onChange} />);

        fireEvent.keyDown(getByRole('spinbutton'), { key: 'End' });
        expect(onChange).to.have.been.calledWith('100');
      });
    });
  });
});
