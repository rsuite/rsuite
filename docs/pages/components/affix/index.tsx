import * as React from 'react';
import { Affix, Button, ButtonToolbar } from 'rsuite';
import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Affix"
        examples={['container']}
        dependencies={{
          ButtonToolbar,
          Button,
          Affix
        }}
      />
    </Frame>
  );
}
