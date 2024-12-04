import React from 'react';
import { testStandardProps } from '@test/utils';
import { render } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  testStandardProps(<Card />, {
    sizes: ['lg', 'md', 'sm']
  });

  it('Should hava a border', () => {
    const { container } = render(<Card bordered />);
    expect(container.firstChild).to.have.class('rs-card-bordered');
  });

  it('Should have a shadow', () => {
    const { container } = render(<Card shaded />);
    expect(container.firstChild).to.have.class('rs-card-shaded');
  });

  it('Should have a direction', () => {
    const { container } = render(<Card direction="row" />);
    expect(container.firstChild).to.have.class('rs-card-row');
  });

  it('Should have a width', () => {
    const { container } = render(<Card width={100} />);
    expect(container.firstChild).to.have.style('--rs-card-width', '100px');
  });
});
