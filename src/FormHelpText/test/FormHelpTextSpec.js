import React from 'react';
import { getDOMNode } from '@test/testUtils';
import FormHelpText from '../FormHelpText';
import { assert } from 'chai';

describe('FormHelpText', () => {
  it('Should render a FormHelpText', () => {
    const title = 'Test';
    const instance = getDOMNode(<FormHelpText>{title}</FormHelpText>);
    assert.equal(instance.className, 'rs-form-help-text');
    assert.equal(instance.tagName, 'SPAN');
    assert.equal(instance.innerHTML, title);
  });

  it('Should render a tooltip ', () => {
    const instance = getDOMNode(<FormHelpText tooltip />);
    assert.include(instance.className, 'rs-form-help-text-tooltip');
    assert.isNotNull(instance.querySelector('[aria-label="help o"]'));
  });

  it('Should have `for` in span ', () => {
    const id = 'Test';
    const instance = getDOMNode(<FormHelpText htmlFor={id} />);
    assert.ok(instance.getAttribute('for'), id);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<FormHelpText className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<FormHelpText style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<FormHelpText classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
