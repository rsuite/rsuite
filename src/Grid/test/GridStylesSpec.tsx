import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid from '../index';

import '../styles/index.less';

describe('Grid styles', () => {
  it('Should render the correct styles', () => {
    render(<Grid />);
    expect(screen.getByRole('grid')).to.have.style('padding', '0px 5px');
  });
});
