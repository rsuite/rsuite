import React from 'react';
import { getDOMNode, testStandardProps } from '@test/utils';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  testStandardProps(<Tooltip />);

  it('Should render a Tooltip', () => {
    const title = 'Test';
    const instance = getDOMNode(<Tooltip>{title}</Tooltip>);
    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.className, 'rs-tooltip rs-tooltip-arrow');
    assert.equal(instance.textContent, title);
  });

  it('Tooltip should without arrow', () => {
    const instance = getDOMNode(<Tooltip arrow={false}>Test</Tooltip>);
    assert.equal(instance.className, 'rs-tooltip');
  });

  it('Should have a id', () => {
    const instance = getDOMNode(<Tooltip id="tooltip" />);
    assert.equal(instance.id, 'tooltip');
  });
});
