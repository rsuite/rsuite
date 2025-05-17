import React from 'react';
import Grid from '../index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.less';

describe('Grid styles', () => {
  it('Should render the correct styles', () => {
    render(<Grid>Grid</Grid>);
    expect(screen.getByText('Grid')).to.have.style('padding', '0px 6px');
  });
});
