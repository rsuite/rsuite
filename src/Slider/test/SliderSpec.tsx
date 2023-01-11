import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Slider from '../Slider';
import Sinon from 'sinon';

describe('Slider', () => {
  testStandardProps(<Slider />);

  it('Should render a Slider', () => {
    const instance = getDOMNode(<Slider />);
    assert.equal(instance.className, 'rs-slider');
  });

  it('Should have a progress ', () => {
    const instance = getDOMNode(<Slider progress defaultValue={50} />);
    assert.equal(
      (instance.querySelector('.rs-slider-progress-bar') as HTMLElement).style.width,
      '50%'
    );
  });

  it('Should output the scale', () => {
    const instance = getDOMNode(<Slider step={10} max={100} graduated />);
    const instance2 = getDOMNode(<Slider min={10} step={10} max={100} graduated />);
    assert.equal(instance.querySelectorAll('li').length, 10);
    assert.equal(instance2.querySelectorAll('li').length, 9);
  });

  it('Should be displayed vertically', () => {
    const instance = getDOMNode(<Slider vertical />);
    assert.include(instance.className, 'rs-slider-vertical');
    assert.equal(
      (instance.querySelector('input') as HTMLElement).getAttribute('aria-orientation'),
      'vertical'
    );
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Slider disabled />);
    assert.include(instance.className, 'rs-slider-disabled');
  });

  it('Should custom render mark', () => {
    const instance = getDOMNode(
      <Slider
        progress
        min={0}
        max={2}
        graduated
        renderMark={mark => {
          return mark == 0 ? 'Single' : mark;
        }}
      />
    );

    const marks = instance.querySelectorAll('.rs-slider-mark-content');
    assert.equal(marks[0].textContent, 'Single');
    assert.equal(marks[1].textContent, '1');
    assert.equal(marks[2].textContent, '2');
  });

  it('Should render custom title', () => {
    const instance = getDOMNode(<Slider tooltip={false} handleTitle={'test'} />);
    assert.equal(instance.textContent, 'test');
  });

  it('Should handle keyboard operations', () => {
    const instance = getDOMNode(<Slider defaultValue={10} />);
    const handle = instance.querySelector('.rs-slider-handle') as HTMLElement;
    const input = instance.querySelector('input[type="range"]') as HTMLInputElement;
    assert.equal(input.value, '10');

    fireEvent.keyDown(handle, { key: 'ArrowUp' });
    assert.equal(input.value, '11');

    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    assert.equal(input.value, '12');

    fireEvent.keyDown(handle, { key: 'ArrowDown' });
    assert.equal(input.value, '11');

    fireEvent.keyDown(handle, { key: 'ArrowLeft' });
    assert.equal(input.value, '10');

    fireEvent.keyDown(handle, { key: 'Home' });
    assert.equal(input.value, '0');

    fireEvent.keyDown(handle, { key: 'End' });
    assert.equal(input.value, '100');
  });

  it('Should call `onChangeCommitted` callback', () => {
    const onChangeCommitted = Sinon.spy();
    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    const instance = getDOMNode(<Slider onChangeCommitted={onChangeCommitted} />);

    const handle = instance.querySelector('.rs-slider-handle') as HTMLElement;
    fireEvent.mouseDown(handle);
    handle.dispatchEvent(mousemoveEvent);

    assert.include(handle.className, 'active');
    handle.dispatchEvent(mouseupEvent);

    expect(onChangeCommitted).to.have.been.calledOnce;
  });

  it('Should call `onChange` callback', () => {
    const onChange = Sinon.spy();
    const instance = getDOMNode(<Slider onChange={onChange} />);
    fireEvent.click(instance.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should output an `input` stored value', () => {
    const instance = getDOMNode(<Slider min={10} max={100} value={20} />);

    const input = instance.querySelector('input[type="range"]') as HTMLInputElement;

    assert.equal(input.value, '20');
    assert.equal(input.getAttribute('aria-valuenow'), '20');
    assert.equal(input.getAttribute('aria-valuemax'), '100');
    assert.equal(input.getAttribute('aria-valuemin'), '10');
    assert.equal(input.getAttribute('aria-orientation'), 'horizontal');
  });

  describe('Plain text', () => {
    it('Should render input value', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <Slider value={1} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('1');
    });

    it('Should render "Not selected" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          {/* FIXME `value` prop does not accept null as value */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Slider value={null} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Not selected');
    });
  });
});
