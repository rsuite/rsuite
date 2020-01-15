import * as React from 'react';
import { Divider, Button, ButtonGroup } from 'rsuite';

import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'with-text', 'vertical']}
      dependencies={{ Divider, Button, ButtonGroup }}
    />
  );
}
