import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Menu,
  ButtonToolbar,
  Button,
  Whisper,
  Popover,
  Loader,
  Toggle
} from 'rsuite';

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
        Menu,
        Loader,
        Toggle
      }}
    />
  );
}
