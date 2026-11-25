import React from 'react';
import { expectType } from 'ts-expect';
import Table, { TableInstance } from '../';

type Row = {
  id: number;
  name: string;
};

const data: Row[] = [
  {
    id: 1,
    name: 'First'
  },
  {
    id: 2,
    name: 'Second'
  }
];

const ref = React.createRef<TableInstance<Row, string>>();

<Table
  ref={ref}
  data={data}
  onRowClick={row => {
    expectType<Row>(row);
  }}
>
  <Table.Column width={100}>
    <Table.HeaderCell>Name</Table.HeaderCell>
    <Table.Cell dataKey="name" />
  </Table.Column>
</Table>;

// It should be possible to call instance methods via ref

ref.current?.body;
ref.current?.root;
ref.current?.scrollLeft(100);
ref.current?.scrollTop(100);

interface InventoryItem {
  id: string;
  name: string;
}

const table = React.createRef<TableInstance<InventoryItem, string>>();

<Table<InventoryItem, string> ref={table}>
  {({ Column, HeaderCell, Cell }) => (
    <>
      <Column>
        <HeaderCell>Name</HeaderCell>
        <Cell>{row => row.name}</Cell>
      </Column>
      <Column>
        <HeaderCell>Type</HeaderCell>
        {/** @ts-expect-error Property 'type' does not exist on type 'InventoryItem' */}
        <Cell>{row => row.type}</Cell>
      </Column>
    </>
  )}
</Table>;

interface ImageCellProps<TKey extends string, TRow extends Record<TKey, string>> {
  rowData: TRow;
  dataKey: TKey;
  // ... any other props
}

export const ImageCell = <TKey extends string, TRow extends Record<TKey, string>>({
  rowData,
  dataKey,
  ...rest
}: ImageCellProps<TKey, TRow>) => (
  <Table.Cell<TRow, TKey> {...rest}>
    <img src={rowData[dataKey]} width="50" />
  </Table.Cell>
);
