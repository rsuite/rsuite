import React from 'react';
import { testStandardProps } from '@test/utils';
import { render } from '@testing-library/react';
import CardGroup from '../CardGroup';

describe('CardGroup', () => {
  testStandardProps(<CardGroup />);

  it('Should render a columns CSS variable', () => {
    const { container } = render(<CardGroup columns={2} />);

    expect(container.firstChild).to.have.style('--rs-columns', '2');
  });

  it('Should render a spacing CSS variable', () => {
    const { container, rerender } = render(<CardGroup spacing={20} />);

    expect(container.firstChild).to.have.style('--rs-spacing', '20px');

    rerender(<CardGroup spacing="1rem" />);

    expect(container.firstChild).to.have.style('--rs-spacing', '1rem');
  });
});
