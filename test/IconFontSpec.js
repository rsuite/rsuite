import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import IconFont from '../src/IconFont';

describe('IconFont', () => {
  it('Should output a i', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" />
    );
    assert.equal(findDOMNode(instance).nodeName, 'I');
  });

  it('Should output a span', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" componentClass="span" />
    );
    assert.equal(findDOMNode(instance).nodeName, 'SPAN');
  });

  it('Should have a class prefix rsuite-icon', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" prefixClass="rsuite-icon" />
    );
    assert.ok(findDOMNode(instance).className.match(/\brsuite-icon rsuite-icon-star\b/));
  });


  it('Should have icon class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bicon icon-star\b/));
  });

  it('Should have fw class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" fixedWidth />
    );
    assert.ok(findDOMNode(instance).className.match(/\bicon-fw\b/));
  });

  it('Should have pulse class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" pulse />
    );
    assert.ok(findDOMNode(instance).className.match(/\bicon-pulse\b/));
  });

  it('Should have rotate-50 class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" rotate={50} />
    );
    assert.ok(findDOMNode(instance).className.match(/\bicon-rotate-50\b/));
  });


  it('Should have 2x class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" size="2x" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bicon-2x\b/));
  });

  it('Should have vertical class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" flip="vertical" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bicon-flip-vertical\b/));
  });

  it('Should have stack-2x class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" stack="2x" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bicon-stack-2x\b/));
  });

  it('Should have spin class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" spin />
    );
    assert.ok(findDOMNode(instance).className.match(/\bicon-spin\b/));
  });

  it('Should have pulse class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" pulse />
    );
    assert.ok(findDOMNode(instance).className.match(/\bicon-pulse\b/));
  });


  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <IconFont icon="star" style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
