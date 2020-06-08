import * as React from 'react';

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

declare const TableColumnGroup: React.ComponentType<ColumnGroupProps>;

export default TableColumnGroup;
