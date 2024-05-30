import React from 'react';
import {
  Table as RsTable,
  TableProps,
  RowDataType,
  TableInstance,
  CellProps as TableCellProps,
  RowKeyType
} from 'rsuite-table';
import { useCustom } from '@/internals/hooks';

import TableCell from './TableCell';
import TableHeaderCell from './TableHeaderCell';
import TableColumn from './TableColumn';
import TableColumnGroup from './TableColumnGroup';

export interface CellProps<Row extends RowDataType>
  extends Omit<TableCellProps<Row>, 'rowData' | 'dataKey'> {
  /** Data binding key, but also a sort of key */
  dataKey?: string | keyof Row;

  /** Row Data */
  rowData?: Row;
}

const CustomTable = React.forwardRef((props, ref) => {
  const { locale: localeProp, loadAnimation = true, ...rest } = props;
  const { locale, rtl } = useCustom('Table', localeProp);

  return <RsTable {...rest} rtl={rtl} ref={ref} locale={locale} loadAnimation={loadAnimation} />;
}) as <Row extends RowDataType, Key extends RowKeyType>(
  props: TableProps<Row, Key> & React.RefAttributes<TableInstance<Row, Key>>
) => React.ReactElement;

/**
 * The `Table` component is used to display data in a table.
 *
 * @see https://rsuitejs.com/components/table/
 */
const Table = Object.assign(CustomTable, {
  /**
   * The `Table.Cell` component  is used to display data in a table cell.
   */
  Cell: TableCell,

  /**
   * The `Table.Column` component  is used to define a column in a table.
   */
  Column: TableColumn,

  /**
   * The `Table.HeaderCell` component  is used to define a header cell in a table.
   */
  HeaderCell: TableHeaderCell,

  /**
   * The `Table.ColumnGroup` component  is used to define a column group in a table.
   */
  ColumnGroup: TableColumnGroup
});

export default Table;
