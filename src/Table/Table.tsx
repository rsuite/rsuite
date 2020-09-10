import { setStatic, compose } from 'recompose';
import { Table, Column, Cell, HeaderCell, ColumnGroup } from 'rsuite-table';

import { defaultProps } from '../utils';
import withLocale from '../IntlProvider/withLocale';
import TablePagination from './TablePagination';

const EnhancedLocaleTable = compose(
  withLocale(['Table']),
  defaultProps({ loadAnimation: true })
)(Table);

setStatic('Column', Column)(EnhancedLocaleTable);
setStatic('ColumnGroup', ColumnGroup)(EnhancedLocaleTable);
setStatic('Cell', Cell)(EnhancedLocaleTable);
setStatic('HeaderCell', HeaderCell)(EnhancedLocaleTable);
setStatic('Pagination', TablePagination)(EnhancedLocaleTable);

export default EnhancedLocaleTable;
