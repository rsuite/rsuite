import React from 'react';
import Table from '../Table';
import Column from '../Column';
import Cell from '../Cell';
import HeaderCell from '../HeaderCell';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ExpandableTable', () => {
  it('Should be to avoid nested classPrefix', () => {
    const data = [{ id: 1, name: 'foobar' }];
    const innerTable = React.createRef<any>();

    render(
      <Table
        data={data}
        rowKey="id"
        expandedRowKeys={[1]}
        renderRowExpanded={() => {
          return (
            <Table data={data} ref={innerTable}>
              <Column width={130}>
                <HeaderCell>inner name</HeaderCell>
                <Cell dataKey="name" />
              </Column>
            </Table>
          );
        }}
      >
        <Column width={130}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
      </Table>
    );

    expect(innerTable.current.root).to.have.class('rs-table');
    expect(innerTable.current.root).to.have.class('rs-table-hover');
  });

  it('Should set the height of rows and cells separately', () => {
    const data = [{ id: 1, name: 'foobar' }];

    render(
      <Table
        data={data}
        rowKey="id"
        showHeader={false}
        expandedRowKeys={[1]}
        rowExpandedHeight={200}
        renderRowExpanded={() => {
          return <div>content</div>;
        }}
      >
        <Column width={130}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
      </Table>
    );

    expect(screen.getByRole('row')).to.have.style('height', '246px');
    expect(screen.getByRole('gridcell', { name: 'foobar' })).to.have.style('height', '46px');
    expect(screen.getByRole('gridcell', { name: 'foobar' }).childNodes[0]).to.have.style(
      'height',
      '46px'
    );
  });

  it('Should the expandable areas has different heights ', () => {
    const data = [
      { id: 1, name: 'foobar' },
      { id: 2, name: 'foobar2' },
      { id: 3, name: 'foobar3' }
    ];

    const { container } = render(
      <Table
        data={data}
        rowKey="id"
        showHeader={false}
        expandedRowKeys={[1, 2, 3]}
        rowExpandedHeight={(rowData: any) => {
          return rowData.id * 100;
        }}
        renderRowExpanded={() => {
          return <div>content</div>;
        }}
      >
        <Column width={130}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
      </Table>
    );
    const rowExpandedHeights: number[] = [];
    container
      .querySelectorAll('.rs-table-row-expanded')
      .forEach((el: Element) => rowExpandedHeights.push((el as HTMLElement).offsetHeight));

    expect(rowExpandedHeights).to.deep.equal([100, 200, 300]);
  });
});
