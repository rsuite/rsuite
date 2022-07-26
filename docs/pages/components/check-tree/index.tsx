import React from 'react';
import { CheckTree, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';
import PageIcon from '@rsuite/icons/Page';
import { mockTreeData, mockTreeDataToString } from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: mockTreeDataToString
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ CheckTree, Toggle, PageIcon, mockTreeData }}
      sandboxFiles={[mockfile]}
    />
  );
}
