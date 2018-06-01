import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Popover from '../src/Popover';
import innerText from './innerText';

describe('Popover', () => {
  it('Should render a Popover', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<Popover>{title}</Popover>);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'DIV');
    assert.ok(instanceDom.className.match(/\bpopover\b/));
    assert.equal(innerText(instanceDom), title);
  });

  it('Should render at left', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<Popover placement="left">{title}</Popover>);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bleft\b/));
  });

  it('Should be full', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Popover full>Test</Popover>);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-popover-full'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Popover className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Popover style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
