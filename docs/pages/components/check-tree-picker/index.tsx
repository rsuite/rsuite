import React from 'react';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import PlacementContainer from '@/components/PlacementContainer';
import Simulation from '@/components/Simulation';
import {
  CheckTreePicker,
  Button,
  Toggle,
  Checkbox,
  VStack,
  HStack,
  Loader,
  Box,
  Text
} from 'rsuite';
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
  'import-guide': () => <ImportGuide components={['CheckTreePicker']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="check-tree-picker" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Checkbox,
        CheckTreePicker,
        Button,
        Toggle,
        PeoplesIcon,
        AdminIcon,
        VStack,
        HStack,
        Loader,
        Box,
        Text,
        mockTreeData,
        mockAsyncData,
        PlacementContainer
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
