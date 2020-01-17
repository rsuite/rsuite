import * as React from 'react';
import { CheckPicker, Button, Icon, Checkbox, RadioGroup, Radio } from 'rsuite';
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
        'sticky',
        'block',
        'group',
        'placement',
        'custom',
        'disabled',
        'searchable',
        'extra-footer',
        'async',
        'container',
        'controlled'
      ]}
      dependencies={{
        CheckPicker,
        Button,
        Icon,
        Checkbox,
        RadioGroup,
        Radio,
        data,
        PreventOverflowContainer
      }}
    />
  );
}
