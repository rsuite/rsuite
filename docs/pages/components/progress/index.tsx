import * as React from 'react';
import { Progress, Button, ButtonGroup, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['line', 'line-vertical', 'circle', 'dynamic']}
      dependencies={{ Progress, Button, ButtonGroup, Row, Col }}
    />
  );
}
