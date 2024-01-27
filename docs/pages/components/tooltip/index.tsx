import React from 'react';
import { Whisper, Tooltip, ButtonToolbar, Button } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => (
    <ImportGuide components={['Tooltip', 'Whisper']} hasCssComponents={['Tooltip']} />
  )
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Whisper, Tooltip, ButtonToolbar, Button }}
    />
  );
}
