import React from 'react';
import { Affix, Button, ButtonToolbar, Placeholder } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Affix']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ ButtonToolbar, Button, Affix, Placeholder }}
    />
  );
}
