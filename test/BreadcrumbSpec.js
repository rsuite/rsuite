import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import TestWrapper from './TestWrapper';
import Breadcrumb from '../src/Breadcrumb';

describe('Breadcrumb', () => {
  it('Should apply id to the wrapper ol element', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb id="custom-id" />
      </TestWrapper>
    );

    let olNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ol');

    assert.equal(olNode.id, 'custom-id');
  });

  it('Should have breadcrumb class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb />
      </TestWrapper>
    );

    let olNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ol');
    assert.include(olNode.className, 'breadcrumb');
  });

  it('Should have custom classes', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb className="custom-one custom-two" />
      </TestWrapper>
    );

    let olNode = findDOMNode(instance);
    let classes = olNode.className;

    assert.include(classes, 'breadcrumb');
    assert.include(classes, 'custom-one');
    assert.include(classes, 'custom-two');
  });

  it('Should have a navigation role', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb />
      </TestWrapper>
    );

    let olNode = findDOMNode(instance);
    assert.equal(olNode.getAttribute('role'), 'navigation');
  });

  it('Should have an aria-label in ol', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb />
      </TestWrapper>
    );

    let olNode = findDOMNode(instance);
    assert.equal(olNode.getAttribute('aria-label'), 'breadcrumbs');
  });

  it('Should have a default separator', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb>
          <Breadcrumb.Item>1</Breadcrumb.Item>
          <Breadcrumb.Item>2</Breadcrumb.Item>
        </Breadcrumb>
      </TestWrapper>
    );

    let olNode = findDOMNode(instance);
    assert.equal(olNode.querySelectorAll('li')[1].className, 'rs-breadcrumb-separator');
    assert.equal(olNode.querySelectorAll('li')[1].childNodes[0].tagName, 'I');
  });

  it('Should have a custom separator', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb separator={<span>-</span>}>
          <Breadcrumb.Item>1</Breadcrumb.Item>
          <Breadcrumb.Item>2</Breadcrumb.Item>
        </Breadcrumb>
      </TestWrapper>
    );

    let olNode = findDOMNode(instance);
    assert.equal(olNode.querySelectorAll('li')[1].className, 'rs-breadcrumb-separator');
    assert.equal(olNode.querySelectorAll('li')[1].childNodes[0].tagName, 'SPAN');
    assert.equal(olNode.querySelectorAll('li')[1].childNodes[0].innerText, '-');
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb className="custom" />
      </TestWrapper>
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <TestWrapper>
        <Breadcrumb style={{ fontSize }} />
      </TestWrapper>
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
