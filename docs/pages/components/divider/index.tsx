import React from 'react';
import { Divider, Button, ButtonGroup, Placeholder } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Divider']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Divider, Button, ButtonGroup, Placeholder }}
    />
  );
}
