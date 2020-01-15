import * as React from 'react';
import { Form, FormGroup, RadioGroup, Icon, Button, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={[
        'basic',
        'disabled',
        'radio-group',
        'radio-group-inline',
        'radio-group-inline-picker',
        'radio-group-controller'
      ]}
      dependencies={{ Form, FormGroup, RadioGroup, Icon, Button, Radio }}
    />
  );
}
