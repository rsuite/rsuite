import Table from './Table';
import type { TableProps as TableBaseProps, RowDataType, RowKeyType } from 'rsuite-table';
export type { ColumnProps, ColumnGroupProps, HeaderCellProps, SortType, RowDataType, RowKeyType, TableLocaleType, TableSizeChangeEventName, TableInstance } from 'rsuite-table';
export type TableProps<Row extends RowDataType = any, Key extends RowKeyType = string> = TableBaseProps<Row, Key>;
export type { CellProps } from './Table';
export default Table;
