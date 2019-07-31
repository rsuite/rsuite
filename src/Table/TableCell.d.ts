import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface TableCellProps extends StandardProps {
  /** Data binding key, but also a sort of key */
  dataKey?: string;

  /** Row Number */
  rowIndex?: number;

  /** Row Data */
  rowData?: object;
}

declare const TableCell: React.ComponentType<TableCellProps>;

export default TableCell;
