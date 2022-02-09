import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Footer from '../Footer';

describe('Footer', () => {
  testStandardProps(<Footer />);

  it('Should render a Footer', () => {
    const title = 'Test';
    const instance = getDOMNode(<Footer>{title}</Footer>);
    assert.include(instance.className, 'rs-footer');
    assert.equal(instance.textContent, title);
  });
});
