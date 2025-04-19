import React from 'react';
import { Progress, Button, ButtonGroup, VStack, HStack, Box } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Progress']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Progress, Button, ButtonGroup, VStack, HStack, Box }}
    />
  );
}
