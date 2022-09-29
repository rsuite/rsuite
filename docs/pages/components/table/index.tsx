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
  Tag,
  Progress,
  Loader
} from 'rsuite';
import { faker } from '@faker-js/faker/locale/en';
import DefaultPage from '@/components/Page';

import MoreIcon from '@rsuite/icons/legacy/More';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import {
  mockUsers,
  mockTreeData,
  mockUsersString,
  mockTreeDataToString,
  importFakerString
} from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: [importFakerString, mockUsersString, mockTreeDataToString].join('\n')
};

const sandboxDependencies = {
  '@faker-js/faker': 'latest'
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
        Dropdown,
        MoreIcon,
        CollaspedOutlineIcon,
        ExpandOutlineIcon,
        SpinnerIcon,
        Pagination,
        TagPicker,
        Tag,
        Progress,
        faker,
        Loader,
        mockTreeData,
        mockUsers
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
