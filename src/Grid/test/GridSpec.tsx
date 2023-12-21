import React from 'react';
import { testStandardProps } from '@test/utils';
import { render, screen } from '@testing-library/react';
import Grid from '../Grid';

describe('Grid', () => {
  testStandardProps(<Grid />);

  it('Should render a container', () => {
    const title = 'Test';
    render(<Grid>{title}</Grid>);
    expect(screen.getByRole('grid')).to.have.class('rs-grid-container');
    expect(screen.getByRole('grid')).to.have.text(title);
  });

  it('Should render a fluid container', () => {
    const title = 'Test';
    render(<Grid fluid>{title}</Grid>);
    expect(screen.getByRole('grid')).to.have.class('rs-grid-container-fluid');
  });
});
