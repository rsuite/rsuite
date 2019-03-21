import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import PlaceholderGrid from '../../src/Placeholder/PlaceholderGrid';

describe('PlaceholderGrid', () => {
  it('Should render a PlaceholderGrid', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'DIV');
    assert.equal(instanceDom.className, 'rs-placeholder rs-placeholder-grid');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <PlaceholderGrid classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

  it('Should render 10 columns', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid columns={10} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.children.length, 10);
  });

  it('Should render 10 rows', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid rows={10} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.lastElementChild.children.length, 10);
  });

  it('Height of rows should be 50px', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid rowHeight={50} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.lastElementChild.lastElementChild.style.height, '50px');
  });

  it('Should has a 50px gap between rows', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid rowMargin={50} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.lastElementChild.lastElementChild.style.marginTop, '50px');
  });

  it('Should render nothing: rows=0', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid rows={0} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.lastElementChild.children.length, 0);
  });

  it('Should render nothing: rows=-10', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid rows={-10} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.lastElementChild.children.length, 0);
  });

  it('Should render nothing: columns=0', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid columns={0} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.children.length, 0);
  });

  it('Should render nothing: columns=-10', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid columns={-10} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.children.length, 0);
  });

  it('Should has animation', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderGrid active />);
    const instanceDom = findDOMNode(instance);
    assert.include(
      Array.from(instanceDom.classList),
      'rs-placeholder-active'
    );
  });
});
