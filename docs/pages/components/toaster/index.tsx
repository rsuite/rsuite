import React from 'react';
import {
  Message,
  Notification,
  Button,
  ButtonToolbar,
  SelectPicker,
  useToaster,
  Placeholder,
  Divider
} from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['useToaster']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Message,
        Notification,
        Button,
        ButtonToolbar,
        SelectPicker,
        useToaster,
        Placeholder,
        Divider
      }}
    />
  );
}
