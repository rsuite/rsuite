import React from 'react';
import {
  Message,
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
  'import-guide': () => <ImportGuide components={['Message']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Message,
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
