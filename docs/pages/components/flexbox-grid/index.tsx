import * as React from 'react';
import { FlexboxGrid, Button, Icon, Divider, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'justify', 'align', 'order', 'responsive']}
      dependencies={{ FlexboxGrid, Button, Icon, Divider, Col }}
    />
  );
}
