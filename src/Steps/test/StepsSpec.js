import React from 'react';
import { innerText, getDOMNode } from '@test/testUtils';
import Steps from '../Steps';

describe('Steps', () => {
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
      innerText(instance.querySelector('.rs-steps-item-status-process .rs-steps-item-content')),
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
      innerText(instance.querySelector('.rs-steps-item-status-error .rs-steps-item-content')),
      'B'
    );
  });

  it('Should be small', () => {
    const instance = getDOMNode(<Steps small />);
    assert.ok(instance.className.match(/\brs-steps-small\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Steps className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Steps style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Steps classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
