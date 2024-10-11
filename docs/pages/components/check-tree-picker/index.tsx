import React from 'react';
import { CheckTreePicker, Button, Toggle, Checkbox, VStack, HStack } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
import DefaultPage from '@/components/Page';
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
  'import-guide': () => <ImportGuide components={['CheckTreePicker']} />
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
        SpinnerIcon,
        PeoplesIcon,
        AdminIcon,
        VStack,
        HStack,
        mockTreeData,
        mockAsyncData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
