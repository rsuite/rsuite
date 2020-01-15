import * as React from 'react';
import { Portal, Button } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage examples={['basic']} dependencies={{ Portal, Button }} />;
}
