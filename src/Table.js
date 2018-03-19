import setStatic from 'recompose/setStatic';
import { Table, Column, Cell, HeaderCell } from 'rsuite-table';

import withLocale from './IntlProvider/withLocale';
import TablePagination from './TablePagination';

const EnhancedLocaleTable = withLocale(['Table'])(Table);

setStatic('Column', Column)(EnhancedLocaleTable);
setStatic('Cell', Cell)(EnhancedLocaleTable);
setStatic('HeaderCell', HeaderCell)(EnhancedLocaleTable);
setStatic('Pagination', TablePagination)(EnhancedLocaleTable);

export default EnhancedLocaleTable;
