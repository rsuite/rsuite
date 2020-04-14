import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';
import Popover from '../Popover';
import { innerText } from '@test/testUtils';

describe('Popover', () => {
  it('Should render a Popover', () => {
    const title = 'Test';
    const instance = getDOMNode(<Popover>{title}</Popover>);
    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.className, 'rs-popover');
    assert.equal(innerText(instance), title);
  });

  it('Should be full', () => {
    const instance = getInstance(<Popover full>Test</Popover>);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-popover-full'));
  });

  it('Should have a id', () => {
    const instance = getDOMNode(<Popover id="popover" />);
    assert.equal(instance.id, 'popover');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Popover className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Popover style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Popover classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
