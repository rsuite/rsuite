import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Tooltip from '../src/Tooltip';
import innerText from './innerText';

describe('Tooltip', () => {
  it('Should render a Tooltip', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<Tooltip>{title}</Tooltip>);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'DIV');
    assert.ok(instanceDom.className.match(/\btooltip\b/));
    assert.equal(innerText(instanceDom), title);
  });

  it('Should render at left', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Tooltip placement="left" />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bleft\b/));
  });

  it('Should render at left 10px', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Tooltip positionLeft={10} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.style.left, '10px');
  });

  it('Should render at top 10px', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Tooltip positionTop={10} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.style.top, '10px');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Tooltip className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Tooltip style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
