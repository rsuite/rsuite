import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import Simulation from '@/components/Simulation';
import { TreePicker, Button, VStack, HStack, Loader, Box } from 'rsuite';
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
  'import-guide': () => <ImportGuide components={['TreePicker']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="tree-picker" />
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
        PeoplesIcon,
        AdminIcon,
        FolderFillIcon,
        PageIcon,
        Loader,
        Box,
        mockTreeData,
        mockAsyncData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
