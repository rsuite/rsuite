import React from 'react';
import DefaultPage from '@/components/Page';
import { Tree, Button, InputNumber, Panel } from 'rsuite';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import {
  importFakerString,
  mockTreeData,
  mockTreeDataToString,
  mockAsyncData,
  mockAsyncDataString
} from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: [importFakerString, mockTreeDataToString, mockAsyncDataString].join('\n')
};

const sandboxDependencies = {
  '@faker-js/faker': 'latest'
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
        mockTreeData,
        mockAsyncData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
