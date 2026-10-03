import React from 'react';
import Table from '../Table';
import Column from '../Column';
import Cell from '../Cell';
import ColumnGroup from '../ColumnGroup';
import HeaderCell from '../HeaderCell';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ColumnGroupTable', () => {
  it('Should be aligned in ColumnGroup', () => {
    const data = [
      {
        name: 'test name',
        id: 1
      }
    ];

    render(
      <Table data={data}>
        <ColumnGroup header={'Info'} align="right" verticalAlign="top">
          <Column width={150} resizable sortable align="left" verticalAlign="bottom">
            <HeaderCell>firstName</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={150} resizable sortable>
            <HeaderCell>lastName</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={200} resizable sortable align="center" verticalAlign="middle">
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="name" />
          </Column>
        </ColumnGroup>
      </Table>
    );

    const table = screen.getByRole('grid');

    const groupHeader = table.querySelector('.rs-table-column-group-header-content');
    const groupChildren = table.querySelectorAll(
      '.rs-table-column-group .rs-table-column-group-cell .rs-table-cell-content'
    );

    expect(groupHeader).to.have.style('justify-content', 'flex-end');
    expect(groupHeader).to.have.style('align-items', 'flex-start');

    expect(groupChildren).to.have.length(3);
    expect(groupChildren[0]).to.have.text('firstName');
    expect(groupChildren[1]).to.have.text('lastName');
    expect(groupChildren[2]).to.have.text('Email');

    expect(groupChildren[0]).to.have.style('justify-content', 'flex-start');
    expect(groupChildren[0]).to.have.style('align-items', 'flex-end');
    expect(groupChildren[1]).to.have.style('justify-content', 'flex-end');
    expect(groupChildren[1]).to.have.style('align-items', 'flex-start');

    expect(groupChildren[2]).to.have.style('justify-content', 'center');
    expect(groupChildren[2]).to.have.style('align-items', 'center');

    const groupBodyChildren = table.querySelectorAll(
      '.rs-table-body-row-wrapper .rs-table-cell-content'
    );

    expect(groupBodyChildren).to.have.length(3);

    expect(groupBodyChildren[0]).to.have.style('justify-content', 'flex-start');
    expect(groupBodyChildren[0]).to.have.style('align-items', 'flex-end');
    expect(groupBodyChildren[1]).to.have.style('justify-content', 'flex-end');
    expect(groupBodyChildren[1]).to.have.style('align-items', 'flex-start');

    expect(groupBodyChildren[2]).to.have.style('justify-content', 'center');
    expect(groupBodyChildren[2]).to.have.style('align-items', 'center');
  });

  it('Should render 2 ColumnGroup', () => {
    const columnData = [
      {
        name: 'test 1',
        id: 1
      },
      {
        name: 'test 2',
        id: 2
      }
    ];

    render(
      <div style={{ width: 300 }}>
        <Table data={[]}>
          {columnData.map((item, index) => {
            return (
              <ColumnGroup key={index} header={item.name} fixed>
                <Column width={130} sortable>
                  <HeaderCell>First Name</HeaderCell>
                  <Cell dataKey="firstName" />
                </Column>

                <Column width={130} sortable>
                  <HeaderCell>Last Name</HeaderCell>
                  <Cell dataKey="lastName" />
                </Column>
              </ColumnGroup>
            );
          })}
        </Table>
      </div>
    );

    const table = screen.getByRole('grid');

    expect(table.querySelectorAll('.rs-table-column-group')).to.have.length(2);
    expect(table.querySelectorAll('.rs-table-column-group-header-content')[0]).to.have.text(
      'test 1'
    );

    expect(table.querySelectorAll('.rs-table-column-group-header-content')[1]).to.have.text(
      'test 2'
    );

    expect(
      table.querySelectorAll(
        '.rs-table-column-group .rs-table-cell-header .rs-table-cell-header-icon-sort'
      )
    ).to.have.length(4);
  });
});
