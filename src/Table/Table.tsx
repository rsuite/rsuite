import React from 'react';
import {
  Table as RsTable,
  Column,
  Cell,
  HeaderCell,
  ColumnGroup,
  TableProps,
  ColumnProps,
  ColumnGroupProps
} from 'rsuite-table';
import { StandardProps } from '../@types/common';
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
  extends React.ForwardRefExoticComponent<TableProps & { ref?: React.Ref<TableInstance> }> {
  Column: React.ComponentType<ColumnProps>;
  ColumnGroup: React.ComponentType<ColumnGroupProps>;
  Cell: React.ComponentType<CellProps>;
  HeaderCell: React.ComponentType<StandardProps>;
}

const Table: TableComponent = React.forwardRef((props: TableProps, ref: React.RefObject<any>) => {
  const { locale: localeProp, ...rest } = props;
  const { locale, rtl } = useCustom('Table', localeProp);

  return <RsTable {...rest} rtl={rtl} ref={ref} locale={locale} />;
}) as TableComponent;

Table.Cell = Cell as React.ComponentType<CellProps>;
Table.Column = Column as React.ComponentType<ColumnProps>;
Table.HeaderCell = HeaderCell;
Table.ColumnGroup = ColumnGroup;

Table.displayName = 'Table';
Table.defaultProps = {
  loadAnimation: true
};

export default Table;
