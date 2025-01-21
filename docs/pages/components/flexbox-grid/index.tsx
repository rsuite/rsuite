import React from 'react';
import { FlexboxGrid, Button, Divider, Col } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';

import files from './files';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['FlexboxGrid']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="flexbox-grid" />
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
