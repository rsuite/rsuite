import React from 'react';
import userEvent from '@testing-library/user-event';
import { testStandardProps } from '@test/utils';
import { render, screen } from '@testing-library/react';
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

  it('Should have a shadow on hover', () => {
    render(<Card shaded="hover">Card </Card>);

    userEvent.hover(screen.getByText('Card'));

    expect(screen.getByText('Card')).to.have.class('rs-card-shaded-hover');
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
