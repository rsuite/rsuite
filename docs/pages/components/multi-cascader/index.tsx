import React from 'react';
import { MultiCascader, Button, Toggle, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import LocationIcon from '@rsuite/icons/Location';
import { mockTreeData, mockTreeDataToString } from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: mockTreeDataToString
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
        LocationIcon,
        mockTreeData
      }}
      sandboxFiles={[mockfile]}
    />
  );
}
