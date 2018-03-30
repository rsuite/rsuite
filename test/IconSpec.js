import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import Icon from '../src/Icon';

describe('Icon', () => {
  it('Should output a i', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" />);
    assert.equal(findDOMNode(instance).nodeName, 'I');
  });

  it('Should output a span', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" componentClass="span" />);
    assert.equal(findDOMNode(instance).nodeName, 'SPAN');
  });

  it('Should have a class prefix rsuite-icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Icon icon="star" classPrefix="rsuite-icon" />
    );
    assert.include(findDOMNode(instance).className, 'rsuite-icon-star');
  });

  it('Should have icon class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" />);
    assert.include(findDOMNode(instance).className, 'rs-icon-star');
  });

  it('Should have fw class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" fixedWidth />);
    assert.include(findDOMNode(instance).className, 'rs-icon-fw');
  });

  it('Should have pulse class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" pulse />);
    assert.include(findDOMNode(instance).className, 'rs-icon-pulse');
  });

  it('Should have rotate-50 class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" rotate={50} />);
    assert.include(findDOMNode(instance).className, 'rs-icon-rotate-50');
  });

  it('Should have 2x class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" size="2x" />);
    assert.include(findDOMNode(instance).className, 'rs-icon-2x');
  });

  it('Should have vertical class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" flip="vertical" />);
    assert.include(findDOMNode(instance).className, 'rs-icon-flip-vertical');
  });

  it('Should have stack-2x class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" stack="2x" />);
    assert.include(findDOMNode(instance).className, 'rs-icon-stack-2x');
  });

  it('Should have spin class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" spin />);
    assert.include(findDOMNode(instance).className, 'rs-icon-spin');
  });

  it('Should have pulse class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" pulse />);
    assert.include(findDOMNode(instance).className, 'rs-icon-pulse');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon="star" style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
