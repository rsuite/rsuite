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
  Loader,
  Placeholder,
  HStack,
  VStack,
  Input,
  InputGroup
} from 'rsuite';
import { faker } from '@faker-js/faker/locale/en';
import FakeBrowser from '@/components/FakeBrowser';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import MoreIcon from '@rsuite/icons/legacy/More';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import {
  importFakerString,
  mockTreeData,
  mockTreeDataToString,
  mockUsers,
  mockUsersString,
  sandboxFakerVersion
} from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: [importFakerString, mockUsersString, mockTreeDataToString].join('\n')
};

const sandboxDependencies = {
  ...sandboxFakerVersion
};

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Table']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
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
        Placeholder,
        Input,
        InputGroup,
        HStack,
        VStack,
        FakeBrowser,
        mockTreeData,
        mockUsers
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
