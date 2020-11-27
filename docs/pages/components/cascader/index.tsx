import React from 'react';
import { Cascader, Button, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import useFetchData from '@/utils/useFetchData';
import Spinner from '@rsuite/icons/legacy/Spinner';

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
        PreventOverflowContainer,
        Spinner,
      }}
    />
  );
}
