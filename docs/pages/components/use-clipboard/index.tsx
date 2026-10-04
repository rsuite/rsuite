import React from 'react';
import { Button, Input, Stack, useClipboard } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['useClipboard']} hasCssComponents={[]} />
};

export default function Page(): React.ReactElement {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Button, Input, Stack, useClipboard }}
    />
  );
}
