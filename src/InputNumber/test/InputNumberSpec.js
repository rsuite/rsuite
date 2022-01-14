import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReactTestUtils, { act } from 'react-dom/test-utils';

import InputNumber from '../InputNumber';
import { getDOMNode } from '@test/testUtils';

describe('InputNumber', () => {
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

  it('Should call onChange callback when click up button', () => {
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChangeSpy} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-input-number-touchspin-up'));
    assert.isTrue(onChangeSpy.calledOnce);
  });

  it('Should call onChange callback when click down button', () => {
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChangeSpy} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-input-number-touchspin-down'));
    assert.isTrue(onChangeSpy.calledOnce);
  });

  it('Should return min value  when click up button', () => {
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChangeSpy} min={10} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-input-number-touchspin-up'));
    assert.equal(onChangeSpy.firstCall.firstArg, 10);
  });

  it('Should return max value  when click up button', () => {
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChangeSpy} defaultValue={100} max={10} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-input-number-touchspin-down'));
    assert.equal(onChangeSpy.firstCall.firstArg, 10);
  });

  it('Should call onChange callback when onblur', () => {
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChangeSpy} />);
    const input = instance.querySelector('.rs-input');
    input.value = 2;
    ReactTestUtils.Simulate.blur(input);
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
    ReactTestUtils.Simulate.change(input);
    assert.ok(onChnageSpy.calledOnce);
  });

  it('Should not call onChange callback when is not control component', () => {
    const onChnageSpy = sinon.spy();
    const instance = getDOMNode(<InputNumber onChange={onChnageSpy} />);
    const input = instance.querySelector('.rs-input');
    ReactTestUtils.Simulate.change(input);

    assert.ok(onChnageSpy.calledOnce);
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<InputNumber onBlur={doneOp} />);
    ReactTestUtils.Simulate.blur(instance.querySelector('.rs-input'));
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<InputNumber onFocus={doneOp} />);
    ReactTestUtils.Simulate.focus(instance.querySelector('.rs-input'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<InputNumber className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<InputNumber style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<InputNumber classPrefix="custom-prefix" />);
    assert.include(instance.className, 'custom-prefix');
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
