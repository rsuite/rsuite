import React from 'react';
import DefaultPage from '@/components/Page';
import { Tree, Button, InputNumber, Panel, SelectPicker, Stack } from 'rsuite';
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
  'import-guide': () => <ImportGuide components={['Tree']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Button,
        InputNumber,
        Tree,
        Panel,
        FolderFillIcon,
        PageIcon,
        SelectPicker,
        Stack,
        MdOutlineKeyboardArrowDown,
        MdOutlineKeyboardArrowRight,
        MdFilePresent,
        MdFolder,
        mockTreeData,
        mockAsyncData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
