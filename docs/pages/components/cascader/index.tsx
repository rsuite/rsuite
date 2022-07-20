import React from 'react';
import { Cascader, Button, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import TagIcon from '@rsuite/icons/Tag';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Cascader,
        Button,
        RadioGroup,
        Radio,
        TagIcon
      }}
    />
  );
}
