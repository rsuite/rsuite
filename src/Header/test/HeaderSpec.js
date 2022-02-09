import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Header from '../Header';

describe('Header', () => {
  testStandardProps(<Header />);

  it('Should render a Header', () => {
    const title = 'Test';
    const instance = getDOMNode(<Header>{title}</Header>);
    assert.include(instance.className, 'rs-header');
    assert.equal(instance.textContent, title);
  });
});
