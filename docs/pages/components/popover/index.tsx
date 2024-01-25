import React from 'react';
import { ButtonToolbar, Button, Whisper, Popover, Dropdown, Loader, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => (
    <ImportGuide components={['Popover', 'Whisper']} hasCssComponents={['Popover']} />
  )
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        ButtonToolbar,
        Button,
        Whisper,
        Popover,
        Dropdown,
        Loader,
        Toggle
      }}
    />
  );
}
