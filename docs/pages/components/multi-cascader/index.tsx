import React from 'react';
import { MultiCascader, Button, Toggle, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import useFetchData from '@/utils/useFetchData';
import TagIcon from '@rsuite/icons/Tag';

export default function Page() {
  const { response: data } = useFetchData('province-simplified');
  return (
    <DefaultPage
      dependencies={{
        MultiCascader,
        Button,
        Toggle,
        RadioGroup,
        Radio,
        TagIcon,
        PreventOverflowContainer,
        data
      }}
    />
  );
}
