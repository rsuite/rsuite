import React from 'react';
import { TreePicker, Button, VStack, HStack } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
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

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['TreePicker']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        TreePicker,
        Button,
        VStack,
        HStack,
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
