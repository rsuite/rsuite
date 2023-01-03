import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';

import Input from '../Input';
import Sinon from 'sinon';

describe('Input', () => {
  testStandardProps(<Input />);

  it('Should render a input', () => {
    const domNode = getDOMNode(<Input />);
    assert.include(domNode.className, 'rs-input');
  });

  it('Should be disabled', () => {
    const domNode = getDOMNode(<Input disabled />) as HTMLInputElement;
    assert.ok(domNode.disabled);
  });

  it('Should call onChange callback', () => {
    const onChange = Sinon.spy();
    const instance = getDOMNode(<Input onChange={onChange} />);
    ReactTestUtils.Simulate.change(instance);

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should call onKeyDown callback', () => {
    const onKeyDown = Sinon.spy();
    const instance = getDOMNode(<Input onKeyDown={onKeyDown} />);
    ReactTestUtils.Simulate.keyDown(instance);

    expect(onKeyDown).to.have.been.calledOnce;
  });

  it('Should call onPressEnter callback', () => {
    const onPressEnter = Sinon.spy();
    const instance = getDOMNode(<Input onPressEnter={onPressEnter} />);
    ReactTestUtils.Simulate.keyDown(instance, { key: 'Enter' });

    expect(onPressEnter).to.have.been.calledOnce;
  });

  it('Should set size', () => {
    const instance = getDOMNode(<Input size="lg" />);
    assert.include(instance.className, 'rs-input-lg');
  });

  describe('Plain text', () => {
    it('Should render input value', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <Input value="Haha" plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Haha');
    });

    it('Should render "Unfilled" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <Input value="" plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Unfilled');
    });
  });
});
