import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Breadcrumb from '../src/Breadcrumb';

describe('Breadcrumb', () => {
  it('Should apply id to the wrapper ol element', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Breadcrumb id="custom-id" />);

    const olNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ol');

    assert.equal(olNode.id, 'custom-id');
  });

  it('Should have breadcrumb class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Breadcrumb />);
    const olNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ol');
    assert.include(olNode.className, 'breadcrumb');
  });

  it('Should have custom classes', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb className="custom-one custom-two" />
    );

    const olNode = findDOMNode(instance);
    const classes = olNode.className;

    assert.include(classes, 'breadcrumb');
    assert.include(classes, 'custom-one');
    assert.include(classes, 'custom-two');
  });

  it('Should have a navigation role', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Breadcrumb />);

    const olNode = findDOMNode(instance);
    assert.equal(olNode.getAttribute('role'), 'navigation');
  });

  it('Should have an aria-label in ol', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Breadcrumb />);

    const olNode = findDOMNode(instance);
    assert.equal(olNode.getAttribute('aria-label'), 'breadcrumbs');
  });

  it('Should have a default separator', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    const olNode = findDOMNode(instance);
    assert.equal(olNode.querySelectorAll('li')[1].className, 'rs-breadcrumb-separator');
    assert.equal(olNode.querySelectorAll('li')[1].childNodes[0].tagName, 'I');
  });

  it('Should have a custom separator', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb separator={<span>-</span>}>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    const olNode = findDOMNode(instance);
    assert.equal(olNode.querySelectorAll('li')[1].className, 'rs-breadcrumb-separator');
    assert.equal(olNode.querySelectorAll('li')[1].childNodes[0].tagName, 'SPAN');
    assert.equal(olNode.querySelectorAll('li')[1].childNodes[0].innerText, '-');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Breadcrumb className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Breadcrumb style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Breadcrumb classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

});
