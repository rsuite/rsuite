import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Content from '../Content';

describe('Content', () => {
  testStandardProps(<Content />);

  it('Should render a Content', () => {
    const title = 'Test';
    const instance = getDOMNode(<Content>{title}</Content>);

    assert.equal(instance.className, 'rs-content');
    assert.equal(instance.textContent, title);
  });
});
