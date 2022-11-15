import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import FormHelpText from '../FormHelpText';

describe('FormHelpText', () => {
  testStandardProps(<FormHelpText />);

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
    // FIXME <span> does not support `for` attribute
    //       See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const instance = getDOMNode(<FormHelpText htmlFor={id} />);
    assert.ok(instance.getAttribute('for'), id);
  });
});
