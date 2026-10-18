import React from 'react';
import ColumnGroup from '../ColumnGroup';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';

const Item = ({ className, style, children, headerHeight }: any) => (
  <div className={className} style={{ height: headerHeight, ...style }} role="gridcell">
    {children}
  </div>
);

describe('ColumnGroup', () => {
  testStandardProps(<ColumnGroup />);

  it('Should output a ColumnGroup', () => {
    render(<ColumnGroup data-testid="group" />);

    expect(screen.getByTestId('group')).to.have.class('rs-column-group');
  });

  it('Should output a header', () => {
    render(<ColumnGroup header={'header'} data-testid="group" />);

    expect(screen.getByTestId('group')).to.have.text('header');
  });

  it('Should render 2 cells', () => {
    render(
      <ColumnGroup>
        <Item>a</Item>
        <Item>b</Item>
      </ColumnGroup>
    );

    expect(screen.getAllByRole('gridcell')).to.have.length(2);
  });

  it('Should set height 10 for header', () => {
    render(
      <ColumnGroup headerHeight={20} header={'header'} data-testid="group">
        <Item>a</Item>
        <Item>b</Item>
      </ColumnGroup>
    );

    expect(screen.getByText('header')).to.have.style('height', '10px');
    screen.getAllByRole('gridcell').forEach(cell => {
      expect(cell).to.have.style('height', '10px');
    });
  });

  it('Should render height via groupHeaderHeight', () => {
    render(
      <ColumnGroup headerHeight={20} groupHeaderHeight={5} header={'header'}>
        <Item>a</Item>
        <Item>b</Item>
      </ColumnGroup>
    );

    expect(screen.getByText('header')).to.have.style('height', '5px');
    screen.getAllByRole('gridcell').forEach(cell => {
      expect(cell).to.have.style('height', '15px');
    });
  });

  it('Should be centered vertically', () => {
    render(
      <ColumnGroup header={'header'} verticalAlign="middle">
        <Item>a</Item>
        <Item>b</Item>
      </ColumnGroup>
    );

    expect(screen.getByText('header')).to.have.style('align-items', 'center');
  });
});
