import * as React from 'react';
import { Uploader, Icon, Button, Loader, Alert } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Uploader"
        examples={[
          'basic',
          'picture',
          'picture-text',
          'avatar',
          'drag-and-drop',
          'file-list',
          'file-list-custom',
          'disabled',
          'manually',
          'controlled'
        ]}
        dependencies={{ Uploader, Icon, Button, Loader, Alert }}
      />
    </Frame>
  );
}
