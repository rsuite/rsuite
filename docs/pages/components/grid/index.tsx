import React from 'react';
import { Grid, Button, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Grid, Button, Row, Col }} />;
}
