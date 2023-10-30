import React from 'react';
import { CheckTree, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';
import PageIcon from '@rsuite/icons/Page';
import FolderFillIcon from '@rsuite/icons/FolderFill';

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
      dependencies={{ CheckTree, Toggle, PageIcon, FolderFillIcon, mockTreeData, mockAsyncData }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
