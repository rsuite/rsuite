import React from 'react';
import { FlexboxGrid, Button, Divider, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ FlexboxGrid, Button, Divider, Col }} />;
}
