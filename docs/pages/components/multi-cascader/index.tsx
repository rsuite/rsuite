import React from 'react';
import { MultiCascader, Button, Toggle, RadioGroup, Radio, HStack, VStack } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
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
  'import-guide': () => <ImportGuide components={['MultiCascader']} />
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
        mockAsyncData,
        mockTreeData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
