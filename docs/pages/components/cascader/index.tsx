import * as React from 'react';
import { Cascader, Button, Icon, RadioGroup, Radio } from 'rsuite';
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
        'block',
        'placement',
        'parent-selectable',
        'custom',
        'disabled',
        'async',
        'controlled',
        'container',
        'inline'
      ]}
      dependencies={{ data, Cascader, Button, Icon, RadioGroup, Radio, PreventOverflowContainer }}
    />
  );
}
