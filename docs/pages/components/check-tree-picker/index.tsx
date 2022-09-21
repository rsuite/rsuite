import React from 'react';
import { CheckTreePicker, Button, Toggle, Checkbox } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
import DefaultPage from '@/components/Page';
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
        Checkbox,
        CheckTreePicker,
        Button,
        Toggle,
        SpinnerIcon,
        PeoplesIcon,
        AdminIcon,
        mockTreeData,
        mockAsyncData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
