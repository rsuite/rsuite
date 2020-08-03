import * as React from 'react';
import { Form, Button, Checkbox, CheckboxGroup, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={[
        'basic',
        'disabled',
        'indeterminate',
        'checkbox-group',
        'checkbox-groupinline',
        'checkbox-group-controller'
      ]}
      dependencies={{ Form, Button, Checkbox, CheckboxGroup, Icon }}
    />
  );
}
