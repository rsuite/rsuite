import * as React from 'react';
import { Grid, Button, Icon, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'responsive', 'gutter', 'offset', 'pull-push', 'hidden', 'nested']}
      dependencies={{ Grid, Button, Icon, Row, Col }}
    />
  );
}
