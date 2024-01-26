import React from 'react';
import { ButtonToolbar, Button, Whisper } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Whisper']} hasCssComponents={[]} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ ButtonToolbar, Button, Whisper }}
    />
  );
}
