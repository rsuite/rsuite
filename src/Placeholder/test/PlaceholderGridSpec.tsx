import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import PlaceholderGrid from '../PlaceholderGrid';

describe('Placeholder.Grid', () => {
  testStandardProps(<PlaceholderGrid />);

  it('Should render a PlaceholderGrid', () => {
    render(<PlaceholderGrid data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.class('rs-placeholder');
    expect(screen.getByTestId('p')).to.have.class('rs-placeholder-grid');
  });

  it('Should render 10 columns', () => {
    render(<PlaceholderGrid columns={10} data-testid="p" />);

    expect(screen.getByTestId('p').children).to.have.length(10);
  });

  it('Should render 10 rows', () => {
    render(<PlaceholderGrid rows={10} data-testid="p" />);

    expect(screen.getByTestId('p').lastElementChild?.children).to.have.length(10);
  });

  it('Should has a 50px height for each row', () => {
    render(<PlaceholderGrid rowHeight={50} data-testid="p" />);

    expect(screen.getByTestId('p').lastElementChild?.lastElementChild).to.have.style(
      'height',
      '50px'
    );
  });

  it('Should has a 50px gap between rows', () => {
    render(<PlaceholderGrid rowSpacing={50} data-testid="p" />);

    expect(screen.getByTestId('p').lastElementChild?.lastElementChild).to.have.style(
      'margin-top',
      '50px'
    );
  });

  it('Should not render any rows when rows=0', () => {
    render(<PlaceholderGrid rows={0} data-testid="p" />);

    expect(screen.getByTestId('p').lastElementChild?.children).to.have.length(0);
  });

  it('Should not render any rows when rows=-10', () => {
    render(<PlaceholderGrid rows={-10} data-testid="p" />);

    expect(screen.getByTestId('p').lastElementChild?.children).to.have.length(0);
  });

  it('Should not render any columns when columns=0', () => {
    render(<PlaceholderGrid columns={0} data-testid="p" />);

    expect(screen.getByTestId('p').children).to.have.length(0);
  });

  it('Should not render any columns when columns=-10', () => {
    render(<PlaceholderGrid columns={-10} data-testid="p" />);

    expect(screen.getByTestId('p').children).to.have.length(0);
  });

  it('Should be active', () => {
    render(<PlaceholderGrid active data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.class('rs-placeholder-active');
  });
});
