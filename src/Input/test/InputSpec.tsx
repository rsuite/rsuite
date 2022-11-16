import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';

import Input from '../Input';

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

  it('Should call onChange callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Input onChange={doneOp} />);
    ReactTestUtils.Simulate.change(instance);
  });

  it('Should call onKeyDown callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Input onKeyDown={doneOp} />);
    ReactTestUtils.Simulate.keyDown(instance);
  });

  it('Should call onPressEnter callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Input onPressEnter={doneOp} />);
    ReactTestUtils.Simulate.keyDown(instance, { key: 'Enter' });
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
