import React from 'react';
import { Table as RsTable, Column, Cell, HeaderCell, ColumnGroup, TableProps } from 'rsuite-table';
import { StandardProps, RsRefForwardingComponent } from '../@types/common';
import { useCustom } from '../utils';

export interface TableInstance extends React.Component<TableProps> {
  scrollTop: (top: number) => void;
  scrollLeft: (left: number) => void;
}

export interface CellProps<T = any> extends StandardProps {
  /** Data binding key, but also a sort of key */
  dataKey?: string | keyof T;

  /** Row Number */
  rowIndex?: number;

  /** Row Data */
  rowData?: T;
}

interface TableComponent
  extends RsRefForwardingComponent<'div', TableProps & { ref?: React.Ref<TableInstance> }> {
  Column: typeof Column;
  Cell: typeof Cell;
  HeaderCell: typeof HeaderCell;
  ColumnGroup: typeof ColumnGroup;
}

const Table: TableComponent = React.forwardRef<any, TableProps>((props, ref) => {
  const { locale: localeProp, loadAnimation = true, ...rest } = props;
  const { locale, rtl } = useCustom('Table', localeProp);

  return <RsTable {...rest} rtl={rtl} ref={ref} locale={locale} loadAnimation={loadAnimation} />;
}) as unknown as TableComponent;

Table.Cell = Cell;
Table.Column = Column;
Table.HeaderCell = HeaderCell;
Table.ColumnGroup = ColumnGroup;

Table.displayName = 'Table';

export default Table;
