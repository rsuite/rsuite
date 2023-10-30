import React from 'react';
import DefaultPage from '@/components/Page';
import { Tree, Button, InputNumber, Panel, SelectPicker, Stack } from 'rsuite';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
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

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Button,
        InputNumber,
        Tree,
        Panel,
        FolderFillIcon,
        PageIcon,
        SelectPicker,
        Stack,
        mockTreeData,
        mockAsyncData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
