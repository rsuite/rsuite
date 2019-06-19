import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Table from '../Table';

describe('Calendar-Table', () => {
  it('Should render a div with `table` class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Table />);
    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\btable\b/));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Table className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Table style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Table classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
