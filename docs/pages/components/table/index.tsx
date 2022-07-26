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
  Pagination,
  TagPicker,
  Tag
} from 'rsuite';

import DefaultPage from '@/components/Page';

import MoreIcon from '@rsuite/icons/legacy/More';

import MinusSquareIcon from '@rsuite/icons/legacy/MinusSquareO';
import PlusSquareIcon from '@rsuite/icons/legacy/PlusSquareO';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import { mockUsers, mockTreeData, mockUsersString, mockTreeDataToString } from '@/utils/mock';

const { HeaderCell, Cell, Column, ColumnGroup } = Table;

const mockfile = {
  name: 'mock.js',
  content: `${mockTreeDataToString}\n\n${mockUsersString}`
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Nav,
        Checkbox,
        Toggle,
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
        MoreIcon,
        MinusSquareIcon,
        PlusSquareIcon,
        SpinnerIcon,
        Pagination,
        TagPicker,
        Tag,
        mockTreeData,
        mockUsers
      }}
      sandboxFiles={[mockfile]}
    />
  );
}
