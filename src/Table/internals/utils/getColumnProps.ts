import React from 'react';
import type { RowDataType } from '../types';
import type { ColumnProps } from '../Column';

/**
 * Get the union of the props of the column itself and the props of the custom column
 *
 * e.g.
 * const CustomColumn = React.forwardRef((props, ref) => {
 *   return <Column ref={ref} sortable align="center" flexGrow={1} fullText {...props} />;
 * });
 *
 * <CustomColumn width={100} >
 *   <HeaderCell>Header</HeaderCell>
 *   <Cell>Cell</Cell>
 * </CustomColumn>
 *
 */
export default function getColumnProps<Row extends RowDataType>(
  column: React.ReactElement<any>
): ColumnProps<Row> {
  let columnDefaultProps = {};

  try {
    columnDefaultProps = column['type']?.['render']?.()?.props || {};
  } catch {
    // If the render function can't be called outside React context
    // (e.g. it uses hooks), fall back to column.props only.
  }

  return { ...columnDefaultProps, ...column?.props };
}
