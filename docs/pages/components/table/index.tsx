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

import fakeData from '@/resources/data/userList';
import fakeTreeData from '@/resources/data/treeData';
import fakeDataForColSpan from '@/resources/data/usersForColSpan';
import fakeLargeData from '@/resources/data/fakeLargeData.json';

import DefaultPage from '@/components/Page';
import AppContext from '@/components/AppContext';

const { HeaderCell, Pagination, Cell, Column } = Table;
const TablePagination = Pagination;

export default function Page() {
  const { messages, localePath } = React.useContext(AppContext);
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
    'affix-header'
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
