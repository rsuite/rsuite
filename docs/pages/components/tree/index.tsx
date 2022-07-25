import React from 'react';
import DefaultPage from '@/components/Page';
import { Tree, Button, InputNumber, Panel } from 'rsuite';
import { mockTreeData, mockTreeDataToString } from '@/utils/mock';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';

const mockfile = {
  name: 'mock.js',
  content: mockTreeDataToString
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ Button, InputNumber, Tree, Panel, FolderFillIcon, PageIcon, mockTreeData }}
      sandboxFiles={[mockfile]}
    />
  );
}
