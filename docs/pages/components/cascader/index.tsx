import React from 'react';
import { Cascader, Button, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import TagIcon from '@rsuite/icons/Tag';
import { mockTreeData, mockTreeDataToString } from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: mockTreeDataToString
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Cascader,
        Button,
        RadioGroup,
        Radio,
        TagIcon,
        mockTreeData
      }}
      sandboxFiles={[mockfile]}
    />
  );
}
