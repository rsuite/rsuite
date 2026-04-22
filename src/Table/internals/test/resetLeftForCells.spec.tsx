import React from 'react';
import { describe, expect, it } from 'vitest';
import resetLeftForCells from '../utils/resetLeftForCells';
import Cell from '../Cell';
import HeaderCell from '../HeaderCell';

describe('resetLeftForCells', () => {
  const makeCell = (width: number) =>
    React.cloneElement(<Cell dataKey="x" />, { width, left: 0 });

  it('Should reset left positions starting at 0', () => {
    const cells = [makeCell(100), makeCell(200), makeCell(150)];
    const result = resetLeftForCells(cells) as React.ReactElement[];

    expect(result[0].props.left).to.equal(0);
    expect(result[1].props.left).to.equal(100);
    expect(result[2].props.left).to.equal(300);
  });

  it('Should preserve original widths', () => {
    const cells = [makeCell(60), makeCell(80)];
    const result = resetLeftForCells(cells) as React.ReactElement[];

    expect(result[0].props.width).to.equal(60);
    expect(result[1].props.width).to.equal(80);
  });

  it('Should add extraWidth to the last cell', () => {
    const cells = [makeCell(100), makeCell(200)];
    const result = resetLeftForCells(cells, 20) as React.ReactElement[];

    expect(result[0].props.width).to.equal(100);
    expect(result[1].props.width).to.equal(220);
  });

  it('Should return the same number of cells', () => {
    const cells = [makeCell(50), makeCell(60), makeCell(70)];
    const result = resetLeftForCells(cells);
    expect(result).to.have.length(3);
  });
});
