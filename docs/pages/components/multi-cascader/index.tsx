import React from 'react';
import { MultiCascader, Button, Toggle, RadioGroup, Radio, HStack, VStack, Box, Text, Divider } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
import Simulation from '@/components/Simulation';
import PlacementContainer from '@/components/PlacementContainer';
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
  'import-guide': () => <ImportGuide components={['MultiCascader']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="multi-cascader" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        MultiCascader,
        Button,
        Toggle,
        RadioGroup,
        Radio,
        PeoplesIcon,
        AdminIcon,
        HStack,
        VStack,
        Box,
        Text,
        Divider,
        PlacementContainer,
        mockAsyncData,
        mockTreeData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
