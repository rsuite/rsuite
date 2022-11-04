import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Popover from '../Popover';

describe('Popover', () => {
  testStandardProps(<Popover />);

  it('Should render a Popover', () => {
    const title = 'Test';
    const instance = getDOMNode(<Popover>{title}</Popover>);
    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.className, 'rs-popover');
    assert.equal(instance.textContent, title);
    assert.equal(instance.querySelectorAll('.rs-popover-arrow').length, 1);
  });

  it('Popover should without arrow', () => {
    const instance = getDOMNode(<Popover arrow={false}>Test</Popover>);
    assert.equal(instance.querySelectorAll('.rs-popover-arrow').length, 0);
  });

  it('Should be full', () => {
    const instance = getDOMNode(<Popover full>Test</Popover>);
    assert.include(instance.className, 'rs-popover-full');
  });

  it('Should have a id', () => {
    const instance = getDOMNode(<Popover id="popover" />);
    assert.equal(instance.id, 'popover');
  });
});
