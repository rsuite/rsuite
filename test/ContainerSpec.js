import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Container from '../src/Container';

describe('Container', () => {
  it('Should render a Container', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(
      <Container>
        <span>{title}</span>
      </Container>
    );
    assert.equal(findDOMNode(instance).className, 'rs-container');
    assert.equal(findDOMNode(instance).innerText, title);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Container className="custom">
        <span />
      </Container>
    );
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Container style={{ fontSize }}>
        <span />
      </Container>
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
