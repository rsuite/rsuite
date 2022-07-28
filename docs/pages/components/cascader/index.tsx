import React from 'react';
import { Cascader, Button, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import AdminIcon from '@rsuite/icons/Admin';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';

import {
  mockTreeData,
  mockTreeDataToString,
  mockAsyncData,
  importFakerString,
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
        Cascader,
        Button,
        RadioGroup,
        Radio,
        AdminIcon,
        FolderFillIcon,
        PageIcon,
        mockAsyncData,
        mockTreeData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
