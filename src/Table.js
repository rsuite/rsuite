import { Table, Column, Cell, HeaderCell } from 'rsuite-table';

import withLocale from './IntlProvider/withLocale';
import TablePagination from './TablePagination';

Table.Column = Column;
Table.Cell = Cell;
Table.HeaderCell = HeaderCell;
Table.Pagination = TablePagination;

export default withLocale()(Table);
