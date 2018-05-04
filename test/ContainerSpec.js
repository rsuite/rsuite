import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Container from '../src/Container';
import { getDOMNode } from './TestWrapper';

describe('Container', () => {
  it('Should render a Container', () => {
    const title = 'Test';
    const instance = getDOMNode(
      <Container>
        <span>{title}</span>
      </Container>
    );
    assert.equal(instance.className, 'rs-container');
    assert.equal(instance.innerText, title);
  });

  it('Should render a Container when children is false', () => {
    const instance = getDOMNode(<Container>{false}</Container>);
    assert.equal(instance.className, 'rs-container');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <Container className="custom">
        <span />
      </Container>
    );
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <Container style={{ fontSize }}>
        <span />
      </Container>
    );
    assert.equal(instance.style.fontSize, fontSize);
  });
});
