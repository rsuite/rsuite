import * as React from 'react';
import { Grid, Button, Icon, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Grid, Button, Icon, Row, Col }} />;
}
