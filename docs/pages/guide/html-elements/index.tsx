import * as React from 'react';
import { Button, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['anchor', 'heading', 'paragraph', 'list-ul', 'list-ol', 'list-dl']}
      dependencies={{ Button, ButtonToolbar }}
    />
  );
}
