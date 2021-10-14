import React from 'react';
import { Table as RsTable, Column, Cell, HeaderCell, ColumnGroup, TableProps } from 'rsuite-table';
import { StandardProps, RsRefForwardingComponent } from '../@types/common';
import { useCustom } from '../utils';

export interface TableInstance extends React.Component<TableProps> {
  scrollTop: (top: number) => void;
  scrollLeft: (left: number) => void;
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
  extends RsRefForwardingComponent<'div', TableProps & { ref?: React.Ref<TableInstance> }> {
  Column: typeof Column;
  Cell: typeof Cell;
  HeaderCell: typeof HeaderCell;
  ColumnGroup: typeof ColumnGroup;
}

const Table: TableComponent = (React.forwardRef((props: TableProps, ref: React.RefObject<any>) => {
  const { locale: localeProp, loadAnimation = true, ...rest } = props;
  const { locale, rtl } = useCustom('Table', localeProp);

  return <RsTable {...rest} rtl={rtl} ref={ref} locale={locale} loadAnimation={loadAnimation} />;
}) as unknown) as TableComponent;

Table.Cell = Cell;
Table.Column = Column;
Table.HeaderCell = HeaderCell;
Table.ColumnGroup = ColumnGroup;

Table.displayName = 'Table';

export default Table;
