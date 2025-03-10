import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import { Divider, Button, ButtonGroup, Placeholder, HStack } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Divider']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Divider, Button, ButtonGroup, Placeholder, HStack }}
    />
  );
}
