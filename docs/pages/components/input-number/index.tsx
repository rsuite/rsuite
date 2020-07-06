import * as React from 'react';
import {InputNumber, InputGroup} from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'size', 'decimals', 'max-min', 'step', 'disabled', 'fix', 'control']}
      dependencies={{InputNumber, InputGroup}}
    />
  );
}
