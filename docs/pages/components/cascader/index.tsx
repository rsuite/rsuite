import React from 'react';
import { Cascader, Button, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import useFetchData from '@/utils/useFetchData';
import TagIcon from '@rsuite/icons/Tag';

export default function Page() {
  const { response: data } = useFetchData('province-simplified');
  return (
    <DefaultPage
      dependencies={{
        data,
        Cascader,
        Button,
        RadioGroup,
        Radio,
        TagIcon,
        PreventOverflowContainer
      }}
    />
  );
}
