import React from 'react';
import {
  Table,
  Toggle,
  Popover,
  Whisper,
  Button,
  IconButton,
  Divider,
  Nav,
  Checkbox,
  Dropdown,
} from 'rsuite';

import DefaultPage from '@/components/Page';
// import AppContext from '@/components/AppContext';
import useFetchData from '@/utils/useFetchData';
import Edit2 from '@rsuite/icons/legacy/Edit2';
import More from '@rsuite/icons/legacy/More';
import MehO from '@rsuite/icons/legacy/MehO';
import FrownO from '@rsuite/icons/legacy/FrownO';
import SmileO from '@rsuite/icons/legacy/SmileO';
import Arrows from '@rsuite/icons/legacy/Arrows';
import MinusSquareO from '@rsuite/icons/legacy/MinusSquareO';
import PlusSquareO from '@rsuite/icons/legacy/PlusSquareO';
import Spinner from '@rsuite/icons/legacy/Spinner';

const { HeaderCell, Cell, Column, ColumnGroup } = Table;

export default function Page() {
  // const { messages, localePath } = React.useContext(AppContext);
  const { response: fakeData } = useFetchData('users');
  const { response: fakeTreeData } = useFetchData('tree-data');
  const { response: fakeLargeData } = useFetchData('large-data');
  const { response: fakeDataForColSpan } = useFetchData('users-colspan');

  /*
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
    'affix-horizontal-scrollbar',
    'draggable'
  ].map(item => ({
    title: messages?.table[`tab.${item}`],
    source: require(`.${localePath}/${item}.md`)
  }));
*/
  return (
    <DefaultPage
      dependencies={{
        Nav,
        Checkbox,
        Toggle,
        fakeData,
        fakeTreeData,
        fakeDataForColSpan,
        fakeLargeData,
        Popover,
        Whisper,
        Divider,
        IconButton,
        Table,
        Button,
        HeaderCell,
        Cell,
        Column,
        Dropdown,
        ColumnGroup,
        Edit2,
        More,
        MehO,
        FrownO,
        SmileO,
        Arrows,
        MinusSquareO,
        PlusSquareO,
        Spinner,
      }}
    />
  );
}
