import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonToolbar from '../ButtonToolbar';
import '../styles/index.less';

describe('ButtonToolbar styles', () => {
  it('Should render the correct vertical align', () => {
    render(<ButtonToolbar />);

    expect(screen.getByRole('toolbar')).to.have.style('line-height', '0px');
  });

  it('Should render the correct gap', () => {
    const { rerender } = render(<ButtonToolbar />);
    expect(screen.getByRole('toolbar')).to.have.style('gap', '8px');

    rerender(<ButtonToolbar spacing={20} />);
    expect(screen.getByRole('toolbar')).to.have.style('gap', '20px');
  });

  it('Should render the correct flex-wrap', () => {
    render(<ButtonToolbar />);
    expect(screen.getByRole('toolbar')).to.have.style('flex-wrap', 'wrap');
  });
});
