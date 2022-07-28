import React from 'react';
import { TreePicker, Button } from 'rsuite';
import DefaultPage from '@/components/Page';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
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
        TreePicker,
        Button,
        SpinnerIcon,
        PeoplesIcon,
        AdminIcon,
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
