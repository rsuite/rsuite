import React from 'react';
import { CheckPicker, Button, Checkbox, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('users-role');
  return (
    <DefaultPage
      dependencies={{
        CheckPicker,
        Button,
        Checkbox,
        RadioGroup,
        Radio,
        data,
        PreventOverflowContainer,
      }}
    />
  );
}
