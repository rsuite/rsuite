import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

import files from './files';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Grid', 'Row', 'Col']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Grid, Row, Col }}
      sandboxFiles={files}
    />
  );
}
