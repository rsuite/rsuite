import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import { waitFor } from '@testing-library/react';

import Container from '../Container';
import Sidebar from '../../Sidebar';

describe('Container', () => {
  testStandardProps(<Container />);

  it('Should render a Container', () => {
    const { container } = render(
      <Container>
        <span>test</span>
      </Container>
    );

    expect(container.firstChild).to.have.class('rs-container');
    expect(container.firstChild).to.have.text('test');
  });

  it('Should render a Container when children is false', () => {
    const { container } = render(<Container>{false}</Container>);

    expect(container.firstChild).to.have.class('rs-container');
    expect(container.firstChild).to.be.empty;
  });

  // TODO: This is a temporary solution and will be deleted after the component style is updated.
  it('Should have a `has-sidebar` className', async () => {
    const { container } = render(
      <Container>
        <Sidebar />
      </Container>
    );

    await waitFor(() => {
      expect(container.firstChild).to.have.class('rs-container-has-sidebar');
    });
  });
});
