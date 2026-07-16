import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../Table';
import Column from '../Column';
import Cell from '../Cell';
import HeaderCell from '../HeaderCell';
import { describe, expect, it } from 'vitest';

const columns = (
  <>
    <Column>
      <HeaderCell>id</HeaderCell>
      <Cell dataKey="id" />
    </Column>
    <Column>
      <HeaderCell>name</HeaderCell>
      <Cell dataKey="name" />
    </Column>
  </>
);

const mockData = (size = 10) => {
  return Array.from({ length: size }, (_, i) => ({ id: i, name: `name${i}` }));
};

describe('Table - Height ', () => {
  it('Should be automatic height', () => {
    render(
      <Table autoHeight data={mockData(2)}>
        {columns}
      </Table>
    );

    // 2 rows + header row
    const height = 46 * 2 + 40;

    expect(screen.getByRole('grid')).to.have.style('height', `${height}px`);
  });

  it('Should fill the height of the container', () => {
    render(
      <div style={{ height: 300 }}>
        <Table fillHeight height={200} data={[]}>
          {columns}
        </Table>
      </div>
    );

    expect(screen.getByRole('grid')).to.have.style('height', '300px');
  });

  it('Should be automatic height when there is a horizontal scroll bar', () => {
    render(
      <Table autoHeight width={100} data={mockData(2)}>
        <Column width={100}>
          <HeaderCell>id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={100}>
          <HeaderCell>name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
      </Table>
    );
    // 2 rows + header row + scrollbar
    const height = 46 * 2 + 40 + 10;

    expect(screen.getByRole('grid')).to.have.style('height', `${height}px`);
  });

  it('Should have a maximum height', () => {
    render(
      <Table minHeight={200} height={100} data={mockData(2)}>
        {columns}
      </Table>
    );
    expect(screen.getByRole('grid')).to.have.style('height', '200px');
  });

  it('Should have a minimum height, when the number of data rows is less than the minimum height', () => {
    render(
      <Table autoHeight minHeight={500} data={mockData(2)}>
        {columns}
      </Table>
    );
    expect(screen.getByRole('grid')).to.have.style('height', '500px');
  });

  it('Should have a default height when the data is empty', () => {
    render(
      <Table autoHeight data={[]}>
        {columns}
      </Table>
    );
    expect(screen.getByRole('grid')).to.have.style('height', '200px');
  });

  it('Should not exceed the maximum height', () => {
    render(
      <Table data={mockData(2)} maxHeight={300} height={500}>
        {columns}
      </Table>
    );

    expect(screen.getByRole('grid')).to.have.style('height', '300px');
  });

  it('Should not exceed the maximum height even if autoHeight is set', () => {
    render(
      <Table autoHeight data={mockData(10)} maxHeight={300}>
        {columns}
      </Table>
    );

    expect(screen.getByRole('grid')).to.have.style('height', '300px');
  });
});
