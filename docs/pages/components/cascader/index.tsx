import React from 'react';
import { Cascader, Button, RadioGroup, Radio, VStack, HStack } from 'rsuite';
import DefaultPage from '@/components/Page';
import AdminIcon from '@rsuite/icons/Admin';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import ImportGuide from '@/components/ImportGuide';

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
  'import-guide': () => <ImportGuide components={['Cascader']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Cascader,
        Button,
        RadioGroup,
        Radio,
        AdminIcon,
        FolderFillIcon,
        PageIcon,
        VStack,
        HStack,
        mockAsyncData,
        mockTreeData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
