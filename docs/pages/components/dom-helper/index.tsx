import React from 'react';
import { ButtonToolbar, Button, DOMHelper } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['DOMHelper']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ ButtonToolbar, Button, DOMHelper }}
    />
  );
}
