import React from 'react';
import { TreePicker, Button } from 'rsuite';
import DefaultPage from '@/components/Page';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import LocationIcon from '@rsuite/icons/Location';
import { mockTreeData, mockTreeDataToString } from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: mockTreeDataToString
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ TreePicker, Button, SpinnerIcon, LocationIcon, mockTreeData }}
      sandboxFiles={[mockfile]}
    />
  );
}
