/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';
import { Grid, Row, Col, HStack, VStack, Slider, RadioGroup, Radio, Center } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Grid', 'Row', 'Col']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="grid" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Grid,
        Row,
        Col,
        HStack,
        VStack,
        Slider,
        RadioGroup,
        Radio,
        Center
      }}
    />
  );
}
