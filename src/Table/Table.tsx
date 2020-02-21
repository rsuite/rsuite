import setStatic from 'recompose/setStatic';
import compose from 'recompose/compose';
import { Table, Column, Cell, HeaderCell } from 'rsuite-table';

import { defaultProps } from '../utils';
import withLocale from '../IntlProvider/withLocale';
import TablePagination from './TablePagination';

const EnhancedLocaleTable = compose(
  withLocale(['Table']),
  defaultProps({ loadAnimation: true })
)(Table);

setStatic('Column', Column)(EnhancedLocaleTable);
setStatic('Cell', Cell)(EnhancedLocaleTable);
setStatic('HeaderCell', HeaderCell)(EnhancedLocaleTable);
setStatic('Pagination', TablePagination)(EnhancedLocaleTable);

export default EnhancedLocaleTable;
