import * as React from 'react';
import { AutoComplete, InputGroup, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'email', 'render-item', 'disabled', 'input-group', 'controlled']}
      dependencies={{ AutoComplete, InputGroup, Icon }}
    />
  );
}
