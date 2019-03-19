import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import PlaceholderGraph from '../../src/Placeholder/PlaceholderGraph';

describe('PlaceholderGraph', () => {
  it('Should render a PlaceholderGraph', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGraph />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'DIV');
    assert.equal(instanceDom.className, 'rs-placeholder rs-placeholder-graph');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGraph style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <PlaceholderGraph classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

  it('Height should be 100px', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGraph height={100} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.lastElementChild.style.height, '100px');
  });

  it('Width should be 100px', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGraph width={100} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.lastElementChild.style.width, '100px');
  });

  it('Should has animation', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGraph active />);
    const instanceDom = findDOMNode(instance);
    assert.include(Array.from(instanceDom.lastElementChild.classList), 'rs-placeholder-active');
  });
});
