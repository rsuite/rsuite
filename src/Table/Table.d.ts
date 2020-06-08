import * as React from 'react';
import TableColumn from './TableColumn';
import TableColumnGroup from './TableColumnGroup';
import TableCell from './TableCell';
import TableHeaderCell from './TableHeaderCell';
import TablePagination from './TablePagination';
import { StandardProps } from '../@types/common';

type SortType = 'desc' | 'asc';

export interface TableProps<RowKey = string | number | symbol, RowData = any>
  extends StandardProps {
  /** Affix the table header to the specified position on the page */
  affixHeader?: boolean | number;

  /** Affix the table horizontal scrollbar to the specified position on the page */
  affixHorizontalScrollbar?: boolean | number;

  /** width */
  width?: number;

  /** Table data */
  data?: RowData[];

  /** Table Height */
  height?: number;

  /** Automatic Height */
  autoHeight?: boolean;

  /** Minimum Height */
  minHeight?: number;

  /** Row height */
  rowHeight?: number | ((rowData: object) => number);

  /** Add an optional extra class name to row */
  rowClassName?: string | ((rowData: RowData) => string);

  /** Header height */
  headerHeight?: number;

  /** Each row corresponds to the unique key in  data */
  rowKey?: RowKey;

  /** Show as Tree table */
  isTree?: boolean;

  /** Expand all nodes By default */
  defaultExpandAllRows?: boolean;

  /** Specify the default expanded row by  rowkey */
  defaultExpandedRowKeys?: RowKey[];

  /** Specify the default expanded row by  rowkey (Controlled) */
  expandedRowKeys?: RowKey[];

  /** Set the height of an expandable area */
  rowExpandedHeight?: number;

  /** Sort Column Name */
  sortColumn?: string;

  /** Sort type */
  sortType?: SortType;

  /** Sort type */
  defaultSortType?: SortType;

  /** Show loading */
  loading?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Show border */
  bordered?: boolean;

  /** Show cell border */
  cellBordered?: boolean;

  hover?: boolean;
  wordWrap?: boolean;
  bodyRef?: React.Ref<any>;

  /** Display header */
  showHeader?: boolean;

  /** Whether to update the scroll bar after data update */
  shouldUpdateScroll?: boolean;

  /** Callback after click row */
  onRowClick?: (rowData: RowData, event: React.SyntheticEvent<any>) => void;

  /** Callback after right-click row */
  onRowContextMenu?: (rowData: object, event: React.MouseEvent) => void;

  /** Callback function for scroll bar scrolling */
  onScroll?: (scrollX: number, scrollY: number) => void;

  /** Click the callback function of the sort sequence to return the value sortColumn,  sortType */
  onSortColumn?: (dataKey: string, sortType: SortType) => void;

  /** Tree table, the callback function in the expanded node */
  onExpandChange?: (expanded: boolean, rowData: RowData) => void;

  /** Callback after table data update. */
  onDataUpdated?: (nextData: object[], scrollTo: (coord: { x: number; y: number }) => void) => void;

  /** Tree table, the callback function in the expanded node */
  renderTreeToggle?: (
    expandButton: React.ReactNode,
    rowData?: RowData,
    expanded?: boolean
  ) => React.ReactNode;

  /** Customize what you can do to expand a zone */
  renderRowExpanded?: (rowDate?: RowData) => React.ReactNode;

  /** Customize data is empty display content  */
  renderEmpty?: (info: React.ReactNode) => React.ReactNode;

  /** Customize the display content in the data load  */
  renderLoading?: (loading: React.ReactNode) => React.ReactNode;
}

export interface TableInstance extends React.Component<TableProps> {
  scrollTop: (top: number) => void;
  scrollLeft: (left: number) => void;
}

interface TableComponent extends React.ComponentClass<TableProps> {
  Column: typeof TableColumn;
  ColumnGroup: typeof TableColumnGroup;
  Cell: typeof TableCell;
  HeaderCell: typeof TableHeaderCell;
  Pagination: typeof TablePagination;
}

declare const Table: TableComponent;

export default Table;
