import setStatic from 'recompose/setStatic';
import { Table, Column, Cell, HeaderCell } from 'rsuite-table';

import withLocale from './IntlProvider/withLocale';
import TablePagination from './TablePagination';

const WithLocaleTable = withLocale()(Table);


setStatic('Column', Column)(WithLocaleTable);
setStatic('Cell', Cell)(WithLocaleTable);
setStatic('HeaderCell', HeaderCell)(WithLocaleTable);
setStatic('Pagination', TablePagination)(WithLocaleTable);

export default WithLocaleTable;
