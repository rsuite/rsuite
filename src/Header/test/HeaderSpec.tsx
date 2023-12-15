import React from 'react';
import { getDOMNode, testStandardProps } from '@test/utils';
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
