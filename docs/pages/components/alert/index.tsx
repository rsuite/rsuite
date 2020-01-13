import * as React from 'react';
import { Alert, Button, ButtonToolbar } from 'rsuite';
import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Alert"
        examples={['basic', 'duration', 'close']}
        dependencies={{
          ButtonToolbar,
          Button,
          Alert
        }}
      />
    </Frame>
  );
}
