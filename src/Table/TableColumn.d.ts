import * as React from 'react';

export interface TableColumnProps {
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

declare const TableColumn: React.ComponentType<TableColumnProps>;

export default TableColumn;
