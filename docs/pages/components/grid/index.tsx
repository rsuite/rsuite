import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';

import files from './files';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Grid', 'Row', 'Col']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="grid" />
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
