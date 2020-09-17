import * as React from 'react';
import { Uploader, Icon, Button, Loader, Alert } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
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
  );
}
