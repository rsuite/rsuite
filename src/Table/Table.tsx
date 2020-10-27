import React from 'react';
import { Table as RsTable, Column, Cell, HeaderCell, ColumnGroup } from 'rsuite-table';
import TablePagination from './TablePagination';
import { StandardProps } from '../@types/common';
import { useCustom } from '../utils';

export type SortType = 'desc' | 'asc';

export interface TableLocale {
  emptyMessage?: string;
  loading?: string;
}

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
  rowHeight?: number | ((rowData: any) => number);

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

  /** The row of the table has a mouseover effect */
  hover?: boolean;

  /** The cell wraps automatically */
  wordWrap?: boolean;

  /** A ref attached to the table body element */
  bodyRef?: React.Ref<HTMLDivElement>;

  /** Whether to enable loading animation */
  loadAnimation?: true;

  /** The component localized character set. */
  locale: TableLocale;

  /** Display header */
  showHeader?: boolean;

  /** Whether to update the scroll bar after data update */
  shouldUpdateScroll?: boolean;

  /** Callback after click row */
  onRowClick?: (rowData: RowData, event: React.SyntheticEvent<any>) => void;

  /** Callback after right-click row */
  onRowContextMenu?: (rowData: any, event: React.MouseEvent) => void;

  /** Callback function for scroll bar scrolling */
  onScroll?: (scrollX: number, scrollY: number) => void;

  /** Click the callback function of the sort sequence to return the value sortColumn,  sortType */
  onSortColumn?: (dataKey: string, sortType: SortType) => void;

  /** Tree table, the callback function in the expanded node */
  onExpandChange?: (expanded: boolean, rowData: RowData) => void;

  /** Callback after table data update. */
  onDataUpdated?: (nextData: any[], scrollTo: (coord: { x: number; y: number }) => void) => void;

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

export interface ColumnProps {
  /** Alignment */
  align?: 'left' | 'center' | 'right';

  /** Vertical alignment */
  verticalAlign?: 'top' | 'middle' | 'bottom';

  /** Column width */
  width?: number;

  /** Fixed column */
  fixed?: boolean | 'left' | 'right';

  /** Customizable Resize Column width */
  resizable?: boolean;

  /** Sortable */
  sortable?: boolean;

  /** Set the column width automatically adjusts, when set flexGrow cannot set resizable and width property */
  flexGrow?: number;

  /** When you use flexGrow, you can set a minimum width by  minwidth */
  minWidth?: number;

  /** Merges column cells to merge when the dataKey value for the merged column is null or undefined. */
  colSpan?: number;

  /** Callback function for resize the colum */
  onResize?: (columnWidth?: number, dataKey?: string) => void;

  /**A column of a tree */
  treeCol?: boolean;
}

export interface ColumnGroupProps {
  /** Alignment */
  align?: 'left' | 'center' | 'right';

  /** Vertical alignment */
  verticalAlign?: 'top' | 'middle' | 'bottom';

  /** Fixed column */
  fixed?: boolean | 'left' | 'right';

  /** Group header */
  header?: React.ReactNode;
}

export interface CellProps extends StandardProps {
  /** Data binding key, but also a sort of key */
  dataKey?: string;

  /** Row Number */
  rowIndex?: number;

  /** Row Data */
  rowData?: any;
}

interface TableComponent
  extends React.ForwardRefExoticComponent<TableProps & { ref?: React.Ref<TableInstance> }> {
  Column?: React.ComponentType<ColumnProps>;
  ColumnGroup?: React.ComponentType<ColumnGroupProps>;
  Cell?: React.ComponentType<CellProps>;
  HeaderCell?: React.ComponentType<StandardProps>;
  Pagination?: typeof TablePagination;
}

const ReactTable = RsTable as any;
const Table: TableComponent = React.forwardRef(
  (props: TableProps, ref: React.RefObject<typeof ReactTable>) => {
    const { locale: localeProp, ...rest } = props;
    const { locale, rtl } = useCustom('Table', localeProp);

    return <ReactTable {...rest} rtl={rtl} ref={ref} locale={locale} />;
  }
);

Table.Cell = Cell;
Table.Column = Column;
Table.HeaderCell = HeaderCell;
Table.ColumnGroup = ColumnGroup;
Table.Pagination = TablePagination;

Table.displayName = 'Table';
Table.defaultProps = {
  loadAnimation: true
};

export default Table;
