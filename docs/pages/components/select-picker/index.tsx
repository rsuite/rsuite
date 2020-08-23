import * as React from 'react';
import { SelectPicker, Button, Icon, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('users-role');
  return (
    <DefaultPage
      dependencies={{
        PreventOverflowContainer,
        SelectPicker,
        Button,
        Icon,
        data,
        RadioGroup,
        Radio
      }}
    />
  );
}
