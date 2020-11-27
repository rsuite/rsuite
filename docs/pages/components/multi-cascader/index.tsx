import React from 'react';
import { MultiCascader, Button, Toggle, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import useFetchData from '@/utils/useFetchData';
import Spinner from '@rsuite/icons/legacy/Spinner';

export default function Page() {
  const { response: data } = useFetchData('province-simplified');
  return (
    <DefaultPage
      dependencies={{
        MultiCascader,
        Button,
        Spinner,
        Toggle,
        RadioGroup,
        Radio,
        PreventOverflowContainer,
        data,
      }}
    />
  );
}
