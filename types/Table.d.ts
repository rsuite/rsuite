import * as React from 'react';
import TableColumn from './TableColumn';
import TableCell from './TableCell';
import TabelHeaderCell from './TabelHeaderCell';
import TablePagination from './TablePagination';
import { StandardProps } from '.';

type SortType = 'desc' | 'asc';

export interface TableProps extends StandardProps {
  /** width */
  width?: number;

  /** Table data */
  data?: [];

  /** Table Height */
  height?: number;

  /** Automatic Height */
  autoHeight?: boolean;

  /** Minimum Height */
  minHeight?: number;

  /** Row height */
  rowHeight?: number;

  /** Header height */
  headerHeight?: number;

  /** Each row corresponds to the unique key in  data */
  rowKey?: string | number;

  /** Show as Tree table */
  isTree?: boolean;

  /** Expand all nodes By default */
  defaultExpandAllRows?: boolean;

  /** Specify the default expanded row by  rowkey */
  defaultExpandedRowKeys?: Array<string | number>;

  /** Specify the default expanded row by  rowkey (Controlled) */
  expandedRowKeys?: Array<string | number>;

  /** Set the height of an expandable area */
  rowExpandedHeight?: number;

  /** Sort Column Name */
  sortColumn?: string;

  /** Sort type */
  sortType?: SortType;

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

  /** Custom Settings Row Height */
  setRowHeight?: (rowData: object) => number;

  /** Custom Settings Row Height */
  onRowClick?: (rowData: object) => void;

  /** Callback function for scroll bar scrolling */
  onScroll?: (scrollX: number, scrollY: number) => void;

  /** Click the callback function of the sort sequence to return the value sortColumn,  sortType */
  onSortColumn?: (dataKey: string, sortType: SortType) => void;

  /** Tree table, the callback function in the expanded node */
  onExpandChange?: (expanded: boolean, rowData: object) => void;

  /** Tree table, the callback function in the expanded node */
  renderTreeToggle?: (expandButton: React.ReactNode, rowData: object) => React.ReactNode;

  /** Customize what you can do to expand a zone */
  renderRowExpanded?: (rowDate?: object) => React.ReactNode;
}

interface TableComponent extends React.ComponentClass<TableProps> {
  Column: typeof TableColumn;
  Cell: typeof TableCell;
  HeaderCell: typeof TabelHeaderCell;
  Pagination: typeof TablePagination;
}

declare const Table: TableComponent;

export default Table;
