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
