import * as React from 'react';
import {
  Table,
  Toggle,
  Popover,
  Whisper,
  Button,
  IconButton,
  Divider,
  Icon,
  Nav,
  Checkbox,
  Dropdown
} from 'rsuite';

import DefaultPage from '@/components/Page';
import AppContext from '@/components/AppContext';
import useFetchData from '@/utils/useFetchData';

const { HeaderCell, Pagination, Cell, Column } = Table;
const TablePagination = Pagination;

export default function Page() {
  const { messages, localePath } = React.useContext(AppContext);
  const { response: fakeData } = useFetchData('users');
  const { response: fakeTreeData } = useFetchData('tree-data');
  const { response: fakeLargeData } = useFetchData('large-data');
  const { response: fakeDataForColSpan } = useFetchData('users-colspan');

  const tabExamples = [
    'resizable',
    'fluid-column',
    'fixed',
    'word-wrap',
    'custom-cell',
    'sort',
    'pagination',
    'tree',
    'expanded',
    'edit',
    'loading',
    'colspan',
    'summary',
    'auto-height',
    'affix-header',
    'affix-horizontal-scrollbar'
  ].map(item => ({
    title: messages?.table[`tab.${item}`],
    source: require(`.${localePath}/${item}.md`)
  }));

  return (
    <DefaultPage
      examples={['default', 'large']}
      dependencies={{
        Nav,
        Checkbox,
        Toggle,
        fakeData,
        fakeTreeData,
        fakeDataForColSpan,
        fakeLargeData,
        TablePagination,
        Popover,
        Whisper,
        Icon,
        Divider,
        IconButton,
        Table,
        Button,
        HeaderCell,
        Cell,
        Column,
        Dropdown
      }}
      tabExamples={tabExamples}
    />
  );
}
