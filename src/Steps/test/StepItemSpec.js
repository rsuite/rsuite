import React from 'react';
import { innerText, getDOMNode } from '@test/testUtils';
import StepItem from '../StepItem';
import Icon from '../../Icon';

describe('StepItem', () => {
  it('Should render a StepItem', () => {
    const instance = getDOMNode(<StepItem />);
    assert.equal(instance.className, 'rs-steps-item');
  });

  it('Should render a content dom', () => {
    const instance = getDOMNode(<StepItem />);
    assert.equal(instance.querySelectorAll('.rs-steps-item-content').length, 1);
  });

  it('Should have a status', () => {
    const instance = getDOMNode(<StepItem status="process" />);
    assert.ok(instance.className.match(/\brs-steps-item-status-process\b/));
  });

  it('Should render custom icon', () => {
    const instance = getDOMNode(<StepItem icon={<Icon icon="user" />} />);
    assert.ok(instance.className.match(/\brs-steps-item-custom\b/));
    assert.ok(instance.querySelector('i.rs-icon-user'));
  });

  it('Should output a number ', () => {
    const instance = getDOMNode(<StepItem stepNumber={10} />);
    assert.equal(innerText(instance), '10');
  });

  it('Should render description ', () => {
    const instance = getDOMNode(<StepItem description={'test'} />);
    assert.equal(innerText(instance), 'test');
  });

  it('Should render title ', () => {
    const instance = getDOMNode(<StepItem title={'test'} />);
    assert.equal(innerText(instance), 'test');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<StepItem className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<StepItem style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<StepItem classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
