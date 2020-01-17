import * as React from 'react';
import { MultiCascader, Button, Icon, Toggle, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('province-simplified');
  return (
    <DefaultPage
      examples={[
        'basic',
        'appearance',
        'size',
        'cascade',
        'default-value',
        'controlled',
        'block',
        'placement',
        'custom',
        'disabled',
        'uncheckable',
        'async',
        'container',
        'inline'
      ]}
      dependencies={{
        MultiCascader,
        Button,
        Icon,
        Toggle,
        RadioGroup,
        Radio,
        PreventOverflowContainer,
        data
      }}
    />
  );
}
