import * as React from 'react';
import { Badge, Button, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'content', 'invisible', 'independent']}
      dependencies={{ Badge, Button, Toggle }}
    />
  );
}
