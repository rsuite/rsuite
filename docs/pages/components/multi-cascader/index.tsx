import React from 'react';
import { MultiCascader, Button, Toggle, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
import {
  importFakerString,
  mockTreeData,
  mockTreeDataToString,
  mockAsyncData,
  mockAsyncDataString
} from '@/utils/mock';

const sandboxDependencies = {
  '@faker-js/faker': 'latest'
};

const mockfile = {
  name: 'mock.js',
  content: [importFakerString, mockTreeDataToString, mockAsyncDataString].join('\n')
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        MultiCascader,
        Button,
        Toggle,
        RadioGroup,
        Radio,
        PeoplesIcon,
        AdminIcon,
        mockAsyncData,
        mockTreeData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
