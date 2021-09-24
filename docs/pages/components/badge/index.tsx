import React from 'react';
import { Badge, Button, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Badge, Button, Toggle }} />;
}
