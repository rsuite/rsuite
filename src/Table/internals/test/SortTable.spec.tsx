import React from 'react';
import Table from '../Table';
import Column from '../Column';
import Cell from '../Cell';
import HeaderCell from '../HeaderCell';
import ColumnGroup from '../ColumnGroup';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('SortTable', () => {
  const renderSortIcon = sortType => {
    if (sortType === 'asc') {
      return 1;
    } else if (sortType === 'desc') {
      return 2;
    }
    return 3;
  };

  it('Should render a descending icon', () => {
    render(
      <Table data={[]} sortType="desc" sortColumn="id">
        <Column width={20} sortable>
          <HeaderCell renderSortIcon={renderSortIcon}>sort cell</HeaderCell>
          <Cell dataKey="id" />
        </Column>
      </Table>
    );

    expect(screen.getByText('sort cell').childNodes[1]).to.be.text('2');
  });

  it('Should render a ascending icon', () => {
    render(
      <Table data={[]} sortType="asc" sortColumn="id">
        <Column width={20} sortable>
          <HeaderCell renderSortIcon={renderSortIcon}>sort cell</HeaderCell>
          <Cell dataKey="id" />
        </Column>
      </Table>
    );

    expect(screen.getByText('sort cell').childNodes[1]).to.be.text('1');
  });

  it('Should render a default icon', () => {
    render(
      <Table data={[]}>
        <Column width={20} sortable>
          <HeaderCell renderSortIcon={renderSortIcon}>sort cell</HeaderCell>
          <Cell dataKey="id" />
        </Column>
      </Table>
    );

    expect(screen.getByText('sort cell').childNodes[1]).to.be.text('3');
  });

  describe('Sort in ColumnGroup', () => {
    it('Should render a descending icon', () => {
      render(
        <Table data={[]} sortType="desc" sortColumn="id">
          <ColumnGroup header="group">
            <Column width={20} sortable>
              <HeaderCell renderSortIcon={renderSortIcon}>sort cell</HeaderCell>
              <Cell dataKey="id" />
            </Column>
          </ColumnGroup>
        </Table>
      );

      expect(
        screen.getByRole('grid').querySelector('.rs-table-cell-header-sort-wrapper')
      ).to.be.text('2');
    });

    it('Should render a ascending icon', () => {
      render(
        <Table data={[]} sortType="asc" sortColumn="id">
          <ColumnGroup header="group">
            <Column width={20} sortable>
              <HeaderCell renderSortIcon={renderSortIcon}>sort cell</HeaderCell>
              <Cell dataKey="id" />
            </Column>
          </ColumnGroup>
        </Table>
      );

      expect(
        screen.getByRole('grid').querySelector('.rs-table-cell-header-sort-wrapper')
      ).to.be.text('1');
    });

    it('Should render a default icon', () => {
      render(
        <Table data={[]}>
          <ColumnGroup header="group">
            <Column width={20} sortable>
              <HeaderCell renderSortIcon={renderSortIcon}>sort cell</HeaderCell>
              <Cell dataKey="id" />
            </Column>
          </ColumnGroup>
        </Table>
      );

      expect(
        screen.getByRole('grid').querySelector('.rs-table-cell-header-sort-wrapper')
      ).to.be.text('3');
    });
  });
});
