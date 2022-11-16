import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Grid from '../Grid';

describe('Grid', () => {
  testStandardProps(<Grid />);

  it('Should render a container', () => {
    const title = 'Test';
    const instance = getDOMNode(<Grid>{title}</Grid>);
    assert.equal(instance.className, 'rs-grid-container');
    assert.equal(instance.innerHTML, title);
  });

  it('Should render a fluid container', () => {
    const title = 'Test';
    const instance = getDOMNode(<Grid fluid>{title}</Grid>);
    assert.equal(instance.className, 'rs-grid-container-fluid');
  });
});
