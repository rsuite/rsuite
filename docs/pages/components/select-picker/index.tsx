import * as React from 'react';
import { SelectPicker, Button, Icon, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('users-role');
  return (
    <DefaultPage
      examples={[
        'basic',
        'appearance',
        'size',
        'block',
        'group',
        'placement',
        'custom',
        'disabled',
        'searchable',
        'async',
        'container',
        'controlled'
      ]}
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
