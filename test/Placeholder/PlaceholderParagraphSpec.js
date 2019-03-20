import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import PlaceholderParagraph from '../../src/Placeholder/PlaceholderParagraph';

describe('PlaceholderParagraph', () => {
  it('Should render a PlaceholderParagraph', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderParagraph />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.tagName, 'DIV');
    assert.equal(instanceDom.className, 'rs-placeholder rs-placeholder-paragraph');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <PlaceholderParagraph style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <PlaceholderParagraph classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

  it('Should render 5 rows', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderParagraph rows={5} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.lastElementChild.children.length, 5);
  });

  it('Height of rows should be 50px', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderParagraph rowHeight={50} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.lastElementChild.lastElementChild.style.height, '50px');
  });

  it('Should has a 50px gap between rows', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderParagraph rowMargin={50} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.lastElementChild.lastElementChild.style.marginTop, '50px');
  });

  it('Should render graph', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderParagraph graph />);
    const instanceDom = findDOMNode(instance);
    assert.include(
      Array.from(instanceDom.firstElementChild.classList),
      'rs-placeholder-paragraph-graph-area-square'
    );
  });

  it('Should render circle graph', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderParagraph graph="circle" />);
    const instanceDom = findDOMNode(instance);
    assert.include(
      Array.from(instanceDom.firstElementChild.classList),
      'rs-placeholder-paragraph-graph-area-circle'
    );
  });

  it('Should has animation', () => {
    const instance = ReactTestUtils.renderIntoDocument(<PlaceholderParagraph active />);
    const instanceDom = findDOMNode(instance);
    assert.include(
      Array.from(instanceDom.lastElementChild.lastElementChild.classList),
      'rs-placeholder-active'
    );
  });
});
