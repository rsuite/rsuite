import React from 'react';
import DefaultPage from '@/components/layout/Page';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import ImportGuide from '@/components/ImportGuide';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CheckTree, Panel, Button, Toggle, NumberInput, Stack } from 'rsuite';
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
        NumberInput,
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
