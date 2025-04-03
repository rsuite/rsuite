import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';
import { Box, HStack, VStack } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Box']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="box" />
};

export default function Page() {
  return <DefaultPage inDocsComponents={inDocsComponents} dependencies={{ Box, HStack, VStack }} />;
}
