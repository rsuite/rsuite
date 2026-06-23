import React from 'react';
import CellGroup from '../CellGroup';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';

describe('CellGroup', () => {
  testStandardProps(<CellGroup />);

  it('Should render a cell group with default properties', () => {
    render(<CellGroup>CellGroup</CellGroup>);

    expect(screen.getByText('CellGroup')).to.have.class('rs-cell-group');
    expect(screen.getByText('CellGroup').style.transform).to.equal('translate3d(0px, 0px, 0px)');
  });

  it('Should apply specified width to the cell group', () => {
    render(<CellGroup width={100}>CellGroup</CellGroup>);
    expect(screen.getByText('CellGroup')).to.have.style('width', '100px');
  });

  it('Should apply specified height to the cell group', () => {
    render(<CellGroup height={100}>CellGroup</CellGroup>);

    expect(screen.getByText('CellGroup')).to.have.style('height', '100px');
  });

  it('Should apply specified left position to the cell group', () => {
    render(<CellGroup left={100}>CellGroup</CellGroup>);

    expect(screen.getByText('CellGroup').style.transform).to.equal('translate3d(100px, 0px, 0px)');
  });

  it('Should apply fixed positioning to the cell group', () => {
    render(<CellGroup fixed="left">CellGroup</CellGroup>);

    expect(screen.getByText('CellGroup')).to.have.class('rs-cell-group-fixed-left');
  });
});
