import React from 'react';
import { CheckTreePicker, Button, Toggle } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import LocationIcon from '@rsuite/icons/Location';
import DefaultPage from '@/components/Page';
import { mockTreeData, mockTreeDataToString } from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: mockTreeDataToString
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        CheckTreePicker,
        Button,
        Toggle,
        SpinnerIcon,
        LocationIcon,
        mockTreeData
      }}
      sandboxFiles={[mockfile]}
    />
  );
}
