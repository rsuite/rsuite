import React from 'react';
import { testStandardProps } from '@test/utils';
import { render, screen } from '@testing-library/react';
import Grid from '../Grid';

describe('Grid', () => {
  testStandardProps(<Grid />);

  it('Should render a container', () => {
    render(<Grid>Grid</Grid>);
    expect(screen.getByText('Grid')).to.have.class('rs-grid-container');
  });

  it('Should render a fluid container', () => {
    render(<Grid fluid>Grid</Grid>);
    expect(screen.getByText('Grid')).to.have.class('rs-grid-container-fluid');
  });
});
