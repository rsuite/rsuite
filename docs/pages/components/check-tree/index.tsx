import React from 'react';
import { CheckTree, Panel, Button, Toggle, InputNumber, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import ImportGuide from '@/components/ImportGuide';

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  MdFilePresent,
  MdFolder
} from 'react-icons/md';

import {
  importFakerString,
  mockAsyncData,
  mockAsyncDataString,
  mockTreeData,
  mockTreeDataToString,
  sandboxFakerVersion
} from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: [importFakerString, mockTreeDataToString, mockAsyncDataString].join('\n')
};

const sandboxDependencies = {
  ...sandboxFakerVersion
};

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['CheckTree']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Panel,
        Button,
        CheckTree,
        Toggle,
        InputNumber,
        Stack,
        PageIcon,
        FolderFillIcon,
        MdFilePresent,
        MdFolder,
        MdOutlineKeyboardArrowDown,
        MdOutlineKeyboardArrowRight,
        mockTreeData,
        mockAsyncData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
