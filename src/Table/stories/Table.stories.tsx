import React from 'react';
import type { StoryObj } from '@storybook/react';
import Table, { TableProps, ColumnProps } from '../';
import { createMeta } from '@/storybook/utils';
import { mockUsers } from '@/storybook/mocks';
import IconButton from '../../IconButton';
import EditIcon from '@rsuite/icons/Edit';
import { colspanData, rowspanData } from './mock-data';
import '../styles/index.less';
import '../../IconButton/styles/index.less';

const { Column, ColumnGroup, Cell, HeaderCell } = Table;
const CompactCell = props => <Table.Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = props => <Table.HeaderCell {...props} style={{ padding: 4 }} />;

const meta = createMeta(Table);

export default {
  ...meta,
  title: 'Components/Table'
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Expression produces a union type that is too complex to represent.
type Story = StoryObj<typeof meta>;

const data = mockUsers(20);
const getColumns = (options?: { compact?: boolean; columnProps?: ColumnProps<any> }) => {
  const { compact, columnProps } = options || {};

  const HeaderCell = compact ? CompactHeaderCell : Table.HeaderCell;
  const Cell = compact ? CompactCell : Table.Cell;

  return (
    <>
      <Column width={60} align="center" fixed {...columnProps}>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={150} {...columnProps}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={150} {...columnProps}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={100} {...columnProps}>
        <HeaderCell>Gender</HeaderCell>
        <Cell dataKey="gender" />
      </Column>

      <Column width={100} {...columnProps}>
        <HeaderCell>Age</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={150} {...columnProps}>
        <HeaderCell>Postcode</HeaderCell>
        <Cell dataKey="postcode" />
      </Column>

      <Column width={300} {...columnProps}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
      <Column width={80} fixed="right" {...columnProps}>
        <HeaderCell>Action</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
            <IconButton
              appearance="subtle"
              size={compact ? 'xs' : 'md'}
              onClick={() => alert(`id:${rowData.id}`)}
              icon={<EditIcon />}
            />
          )}
        </Cell>
      </Column>
    </>
  );
};

const defaultArgs: TableProps<any, any> = {
  height: 400,
  data,
  children: getColumns()
};

export const Default: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Expression produces a union type that is too complex to represent.
  args: { ...defaultArgs }
};

export const Bordered: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    cellBordered: true
  }
};

export const Compact: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    cellBordered: true,
    headerHeight: 30,
    rowHeight: 30,
    children: getColumns({ compact: true })
  }
};

export const Loading: Story = {
  args: {
    ...defaultArgs,
    loading: true
  }
};

export const Sortable: Story = {
  args: {
    ...defaultArgs,
    sortColumn: 'firstName',
    children: getColumns({ columnProps: { sortable: true } })
  }
};

export const Fluid: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    cellBordered: true,
    height: 400,
    children: (
      <>
        <Column width={50} align="center">
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.Cell dataKey="id" />
        </Column>

        <Column flexGrow={2}>
          <Table.HeaderCell>
            Name <code>flexGrow={2}</code>
          </Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Column>

        <Column flexGrow={1}>
          <Table.HeaderCell>
            City <code>flexGrow={1}</code>
          </Table.HeaderCell>
          <Table.Cell dataKey="city" />
        </Column>

        <Column width={200}>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.Cell dataKey="email" />
        </Column>
      </>
    )
  }
};

export const Colspan: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    cellBordered: true,
    data: colspanData as any,
    headerHeight: 80,
    height: 420,
    children: (
      <>
        <Column width={70} align="center">
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <ColumnGroup header="Name">
          <Column width={130} colSpan={2}>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>
          <Column width={130}>
            <HeaderCell>Last Name</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>
        </ColumnGroup>

        <Column width={200} colSpan={2}>
          <HeaderCell>Address</HeaderCell>
          <Cell dataKey="city" />
        </Column>

        <Column width={200} flexGrow={1}>
          <HeaderCell>Company Name</HeaderCell>
          <Cell dataKey="companyName" />
        </Column>
      </>
    )
  }
};

export const Rowspan: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    cellBordered: true,
    data: rowspanData as any,
    headerHeight: 80,
    height: 420,
    children: (
      <>
        <Column width={80} fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column
          width={200}
          verticalAlign="middle"
          rowSpan={rowData => {
            return rowData.cityRowSpan;
          }}
        >
          <HeaderCell>City</HeaderCell>
          <Cell dataKey="city" />
        </Column>

        <Column
          width={200}
          verticalAlign="middle"
          rowSpan={rowData => {
            return rowData.streetRowSpan;
          }}
        >
          <HeaderCell>Street</HeaderCell>
          <Cell dataKey="street" />
        </Column>

        <Column width={130}>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={130}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={200}>
          <HeaderCell>Company Name</HeaderCell>
          <Cell dataKey="companyName" />
        </Column>
      </>
    )
  }
};

export const ShowFullTextOfCells: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    cellBordered: true,
    children: (
      <>
        <Column width={120} fixed fullText>
          <HeaderCell>Name</HeaderCell>
          <CompactCell dataKey="name" />
        </Column>

        <Column width={300} fullText>
          <HeaderCell>Url</HeaderCell>
          <CompactCell dataKey="avatar" />
        </Column>

        <Column width={130} fullText>
          <HeaderCell>Company</HeaderCell>
          <CompactCell dataKey="company" />
        </Column>

        <Column width={130} fullText>
          <HeaderCell>Email</HeaderCell>
          <CompactCell dataKey="email" />
        </Column>

        <Column width={130} fullText>
          <HeaderCell>City</HeaderCell>
          <CompactCell dataKey="city" />
        </Column>

        <Column width={130} fullText>
          <HeaderCell>Street</HeaderCell>
          <CompactCell dataKey="street" />
        </Column>
      </>
    )
  }
};
