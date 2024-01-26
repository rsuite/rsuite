import React from 'react';
import { FlexboxGrid, Button, Divider, Col } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

import files from './files';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['FlexboxGrid']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ FlexboxGrid, Button, Divider, Col }}
      sandboxFiles={files}
    />
  );
}
