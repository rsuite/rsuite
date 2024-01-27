import React from 'react';
import { Progress, Button, ButtonGroup, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Progress']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Progress, Button, ButtonGroup, Row, Col }}
    />
  );
}
