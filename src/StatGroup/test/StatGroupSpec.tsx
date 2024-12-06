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
    const { container } = render(<StatGroup spacing={20} />);

    expect(container.firstChild).to.have.style('--rs-spacing', '20px');
  });
});
