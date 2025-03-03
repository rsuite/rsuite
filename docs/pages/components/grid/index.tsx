import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';
import { DecorativeBox } from '@/components/DecorativeBox';
import { Grid, Row, Col, HStack, Slider } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Grid', 'Row', 'Col']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="grid" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Grid, Row, Col, HStack, Slider, DecorativeBox }}
    />
  );
}
