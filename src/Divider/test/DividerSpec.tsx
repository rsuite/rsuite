import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Divider from '../Divider';

describe('Divider', () => {
  testStandardProps(<Divider />);

  it('Should render a Divider', () => {
    const instance = getDOMNode(<Divider />);
    const classes = instance.className;

    assert.include(classes, 'rs-divider');
    assert.include(classes, 'rs-divider-horizontal');
  });

  it('Should be vertical', () => {
    const instance = getDOMNode(<Divider vertical />);
    const classes = instance.className;
    assert.include(classes, 'rs-divider-vertical');
    assert.equal(instance.getAttribute('aria-orientation'), 'vertical');
  });

  it('Should hava a children', () => {
    const instance = getDOMNode(<Divider>abc</Divider>);
    const classes = instance.className;
    assert.include(classes, 'rs-divider-with-text');
  });
});
