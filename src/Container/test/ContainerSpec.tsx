import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import { waitFor } from '@testing-library/react';

import Container from '../Container';
import Sidebar from '../../Sidebar';

describe('Container', () => {
  testStandardProps(<Container />);

  it('Should render a Container', () => {
    const instance = getDOMNode(
      <Container>
        <span>test</span>
      </Container>
    );

    expect(instance).to.have.class('rs-container');
    expect(instance).to.have.text('test');
  });

  it('Should render a Container when children is false', () => {
    const instance = getDOMNode(<Container>{false}</Container>);

    expect(instance).to.have.class('rs-container');
    expect(instance).to.be.empty;
  });

  // TODO: This is a temporary solution and will be deleted after the component style is updated.
  it('Should have a `has-sidebar` className', async () => {
    const instance = getDOMNode(
      <Container>
        <Sidebar />
      </Container>
    );

    await waitFor(() => {
      expect(instance).to.have.class('rs-container-has-sidebar');
    });
  });
});
