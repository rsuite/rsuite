import React from 'react';
import Table from '../index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.scss';

const data = [
  {
    id: 1
  },
  {
    id: 2
  }
];

const { Column, HeaderCell, Cell } = Table;

describe('Table styles', () => {
  it('Should render the correct styles', () => {
    render(
      <Table data={data}>
        <Column>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>
      </Table>
    );
    expect(document.querySelector('.rs-table')).to.have.style('position', 'relative');
  });

  it('paints highlighted cells and fixed groups without coloring nested table rows', () => {
    const card = 'rgb(255, 255, 255)';
    const selected = 'rgb(225, 239, 255)';
    const styles = {
      '--rs-bg-card': card,
      '--rs-table-row-selected-bg': selected,
      '--rs-table-row-selected-outline': 'rgb(20, 90, 150)'
    } as React.CSSProperties;

    render(
      <div className="rs-table" style={styles}>
        <div className="rs-table-body-row-wrapper">
          <div className="rs-table-row rs-table-row-highlighted" data-testid="highlighted-row">
            <div className="rs-table-cell-group-fixed-left" data-testid="highlighted-group">
              <div className="rs-table-cell">Selected cell</div>
            </div>
            <div className="rs-table">
              <div className="rs-table-body-row-wrapper">
                <div className="rs-table-row">
                  <div className="rs-table-cell">Nested cell</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rs-table-row">
            <div className="rs-table-cell">Other cell</div>
          </div>
        </div>
      </div>
    );

    for (const element of [
      screen.getByTestId('highlighted-row'),
      screen.getByTestId('highlighted-group'),
      screen.getByText('Selected cell')
    ]) {
      expect(getComputedStyle(element).backgroundColor).toBe(selected);
    }
    expect(getComputedStyle(screen.getByTestId('highlighted-row')).outlineStyle).toBe('solid');
    expect(getComputedStyle(screen.getByText('Nested cell')).backgroundColor).toBe(card);
    expect(getComputedStyle(screen.getByText('Other cell')).backgroundColor).toBe(card);
  });
});
