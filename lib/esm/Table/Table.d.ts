import React from 'react';
import TableColumn from './TableColumn';
import { TableProps, RowDataType, TableInstance, CellProps as TableCellProps, RowKeyType } from 'rsuite-table';
export interface CellProps<Row extends RowDataType> extends Omit<TableCellProps<Row>, 'rowData' | 'dataKey'> {
    /** Data binding key, but also a sort of key */
    dataKey?: string | keyof Row;
    /** Row Data */
    rowData?: Row;
}
/**
 * The `Table` component is used to display data in a table.
 *
 * @see https://rsuitejs.com/components/table/
 */
declare const Table: (<Row extends RowDataType<any>, Key extends RowKeyType>(props: TableProps<Row, Key> & React.RefAttributes<TableInstance<Row, Key>>) => React.ReactElement) & {
    /**
     * The `Table.Cell` component  is used to display data in a table cell.
     */
    Cell: <Row_1 extends RowDataType<any>, Key_1 extends RowKeyType>(props: import("rsuite-table/lib/Cell").InnerCellProps<Row_1, Key_1> & React.RefAttributes<HTMLDivElement>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    /**
     * The `Table.Column` component  is used to define a column in a table.
     */
    Column: typeof TableColumn;
    /**
     * The `Table.HeaderCell` component  is used to define a header cell in a table.
     */
    HeaderCell: <Row_2 extends RowDataType<any>, Key_2 extends RowKeyType>(props: import("rsuite-table").HeaderCellProps<Row_2, Key_2> & React.RefAttributes<HTMLDivElement>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    /**
     * The `Table.ColumnGroup` component  is used to define a column group in a table.
     */
    ColumnGroup: React.ForwardRefExoticComponent<import("rsuite-table").ColumnGroupProps & React.RefAttributes<HTMLDivElement>>;
};
export default Table;
