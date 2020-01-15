import * as React from 'react';
import { Cascader, Button, Icon, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import { getProvince } from '@/resources/data';

export default function Page() {
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
      getDependencies={getProvince}
      dependencies={{ Cascader, Button, Icon, RadioGroup, Radio, PreventOverflowContainer }}
    />
  );
}
