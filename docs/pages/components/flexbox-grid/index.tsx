import React from 'react';
import { FlexboxGrid, Button, Icon, Divider, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ FlexboxGrid, Button, Icon, Divider, Col }} />;
}
