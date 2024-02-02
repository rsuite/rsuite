import React from 'react';
import { Notification, Button, ButtonToolbar, SelectPicker, useToaster, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Notification']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Notification,
        Button,
        ButtonToolbar,
        SelectPicker,
        useToaster,
        Stack
      }}
    />
  );
}
