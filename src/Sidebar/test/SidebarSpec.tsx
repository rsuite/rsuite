import React from 'react';
import { getDOMNode, testStandardProps } from '@test/utils';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  testStandardProps(<Sidebar />);

  it('Should render a Sidebar', () => {
    const title = 'Test';
    const instance = getDOMNode(<Sidebar>{title}</Sidebar>);
    assert.equal(instance.className, 'rs-sidebar');
    assert.equal(instance.textContent, title);
  });
});
