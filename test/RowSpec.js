import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Row from '../src/Row';

describe('Row', () => {
  it('Should render a row', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Row>
        <div />
      </Row>
    );
    assert.include(findDOMNode(instance).className, 'rs-row');
  });

  it('Should render a gutter', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Row gutter={10}>
        <div />
      </Row>
    );
    const node = findDOMNode(instance);

    assert.equal(node.style.marginLeft, '-5px');
    assert.equal(node.style.marginRight, '-5px');
    assert.equal(node.childNodes[0].style.paddingLeft, '5px');
    assert.equal(node.childNodes[0].style.paddingRight, '5px');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Row className="custom">
        <div />
      </Row>
    );
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Row style={{ fontSize }}>
        <div />
      </Row>
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
