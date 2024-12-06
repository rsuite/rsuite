import React from 'react';
import { testStandardProps } from '@test/utils';
import { render } from '@testing-library/react';
import StatGroup from '../StatGroup';

describe('StatGroup', () => {
  testStandardProps(<StatGroup />);

  it('Should render a columns CSS variable', () => {
    const { container } = render(<StatGroup columns={2} />);

    expect(container.firstChild).to.have.style('--rs-columns', '2');
  });

  it('Should render a spacing CSS variable', () => {
    const { container, rerender } = render(<StatGroup spacing={20} />);

    expect(container.firstChild).to.have.style('--rs-spacing', '20px');

    rerender(<StatGroup spacing="1rem" />);

    expect(container.firstChild).to.have.style('--rs-spacing', '1rem');
  });
});
