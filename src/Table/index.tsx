import Table from './Table';
import TableCell from './TableCell';
import TableColumn from './TableColumn';
import TableColumnGroup from './TableColumnGroup';
import TableHeaderCell from './TableHeaderCell';
import type { TableProps as TableBaseProps, RowDataType, RowKeyType } from 'rsuite-table';

// export types
export type {
  ColumnProps,
  ColumnGroupProps,
  HeaderCellProps,
  SortType,
  RowDataType,
  RowKeyType,
  TableLocaleType,
  TableSizeChangeEventName,
  TableInstance
} from 'rsuite-table';

export type TableProps<
  Row extends RowDataType = any,
  Key extends RowKeyType = string
> = TableBaseProps<Row, Key>;

export type { CellProps } from './Table';

// export components
export { Table, TableCell, TableColumn, TableColumnGroup, TableHeaderCell };
export default Table;
