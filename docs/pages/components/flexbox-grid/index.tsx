import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';
import { DecorativeBox } from '@/components/DecorativeBox';
import { FlexboxGrid, Button, Divider, Col } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['FlexboxGrid']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="flexbox-grid" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ FlexboxGrid, Button, Divider, Col, DecorativeBox }}
    />
  );
}
