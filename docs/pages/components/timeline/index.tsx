import * as React from 'react';
import { Timeline, Icon, Grid, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Timeline, Icon, Grid, Row, Col }} />;
}
