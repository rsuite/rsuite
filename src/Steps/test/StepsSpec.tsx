import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Steps from '../Steps';

describe('Steps', () => {
  testStandardProps(<Steps />);

  it('Should render a Steps', () => {
    const instance = getDOMNode(<Steps />);
    assert.equal(instance.className, 'rs-steps rs-steps-horizontal');
  });

  it('Should be displayed vertically', () => {
    const instance = getDOMNode(<Steps vertical />);
    assert.ok(instance.className.match(/\brs-steps-vertical\b/));
  });

  it('Should activate the current step', () => {
    const instance = getDOMNode(
      <Steps current={2}>
        <Steps.Item title="A" />
        <Steps.Item title="B" />
        <Steps.Item title="C" />
        <Steps.Item title="D" />
      </Steps>
    );

    assert.equal(
      (
        instance.querySelector(
          '.rs-steps-item-status-process .rs-steps-item-content'
        ) as HTMLElement
      ).textContent,
      'C'
    );
  });

  it('Should activate the current error step ', () => {
    const instance = getDOMNode(
      <Steps current={1} currentStatus="error">
        <Steps.Item title="A" />
        <Steps.Item title="B" />
        <Steps.Item title="C" />
        <Steps.Item title="D" />
      </Steps>
    );

    assert.equal(
      (instance.querySelector('.rs-steps-item-status-error .rs-steps-item-content') as HTMLElement)
        .textContent,
      'B'
    );
  });

  it('Should be small', () => {
    const instance = getDOMNode(<Steps small />);
    assert.ok(instance.className.match(/\brs-steps-small\b/));
  });
});
