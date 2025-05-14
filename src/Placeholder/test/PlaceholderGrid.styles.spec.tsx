import React from 'react';
import PlaceholderGrid from '../PlaceholderGrid';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../styles/index.less';

describe('Placeholder.Grid styles', () => {
  it('Should render the correct styles', () => {
    render(<PlaceholderGrid data-testid="p" />);

    const firstCol = screen
      .getByTestId('p')
      .querySelector('.rs-placeholder-grid-col:first-child') as HTMLElement;

    const secondCol = screen
      .getByTestId('p')
      .querySelector('.rs-placeholder-grid-col:nth-child(2)') as HTMLElement;

    expect(screen.getByTestId('p')).to.have.style('display', 'flex');
    expect(firstCol).to.have.style('align-items', 'flex-start');
    expect(secondCol).to.have.style('flex', '1 1 0%');
  });
});
