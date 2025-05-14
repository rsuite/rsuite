import React from 'react';
import Grid from '../Grid';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';
import { render, screen } from '@testing-library/react';

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
