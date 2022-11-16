import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Container from '../Container';
import Sidebar from '../../Sidebar';

describe('Container', () => {
  testStandardProps(<Container />);

  it('Should render a Container', () => {
    const title = 'Test';
    const instance = getDOMNode(
      <Container>
        <span>{title}</span>
      </Container>
    );
    assert.equal(instance.className, 'rs-container');
    assert.equal(instance.textContent, title);
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
    // TODO: This is a temporary solution and will be deleted after the component style is updated.
    setTimeout(() => {
      assert.include(instance.className, 'rs-container-has-sidebar');
    }, 0);
  });
});
