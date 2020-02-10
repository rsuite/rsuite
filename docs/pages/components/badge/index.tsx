import * as React from 'react';
import { Badge, Button } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage examples={['basic', 'content', 'independent']} dependencies={{ Badge, Button }} />
  );
}
