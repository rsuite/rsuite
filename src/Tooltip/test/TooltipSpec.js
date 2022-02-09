import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  testStandardProps(<Tooltip />);

  it('Should render a Tooltip', () => {
    const title = 'Test';
    const instance = getDOMNode(<Tooltip>{title}</Tooltip>);
    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.className, 'rs-tooltip');
    assert.equal(instance.textContent, title);
  });

  it('Should have a id', () => {
    const instance = getDOMNode(<Tooltip id="tooltip" />);
    assert.equal(instance.id, 'tooltip');
  });
});
