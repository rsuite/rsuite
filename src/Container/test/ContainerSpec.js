import React from 'react';

import Container from '../Container';
import Sidebar from '../../Sidebar';
import { getDOMNode } from '@test/testUtils';

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

  it('Should have a `has-sidebar` className', () => {
    const instance = getDOMNode(
      <Container>
        <Sidebar />
      </Container>
    );
    assert.include(instance.className, 'rs-container-has-sidebar');
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

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Container classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
