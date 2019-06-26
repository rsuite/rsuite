import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Tooltip from '../Tooltip';
import { innerText, getDOMNode } from '@test/testUtils';

describe('Tooltip', () => {
  it('Should render a Tooltip', () => {
    const title = 'Test';
    const instance = getDOMNode(<Tooltip>{title}</Tooltip>);
    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.className, 'rs-tooltip');
    assert.equal(innerText(instance), title);
  });

  it('Should render at left 10px', () => {
    const instance = getDOMNode(<Tooltip positionLeft={10} />);
    assert.equal(instance.style.left, '10px');
  });

  it('Should render at top 10px', () => {
    const instance = getDOMNode(<Tooltip positionTop={10} />);
    assert.equal(instance.style.top, '10px');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Tooltip className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Tooltip style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Tooltip classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
