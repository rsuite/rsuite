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
import clone from 'lodash/clone';

import fakeData from './data/users';
import fakeTreeData from './data/treeData';
import fakeDataForColSpan from './data/usersForColSpan';
import fakeLargeData from './data/fakeLargeData.json';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import { ThemeContext } from '@/components/Context';
const { HeaderCell, Pagination, Cell, Column } = Table;
const TablePagination = Pagination;

export default function Page() {
  const { messages } = React.useContext(ThemeContext);

  const localePath = messages?.id === 'en-US' ? './en/' : './';

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
    sorce: require(`${localePath}${item}.md`)
  }));

  return (
    <Frame>
      <PageContent
        id="Table"
        examples={['default', 'large']}
        dependencies={{
          _clone: clone,
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
    </Frame>
  );
}
