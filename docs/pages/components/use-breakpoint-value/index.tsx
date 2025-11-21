import React from 'react';
import { Stack, useBreakpointValue, Avatar, Button } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['useBreakpointValue']} hasCssComponents={[]} />,
  'responsive-avatar': () => <Simulation example="avatar" componentName="use-breakpoint-value" />,
  'responsive-stack': () => <Simulation example="stack" componentName="use-breakpoint-value" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        useBreakpointValue,
        Avatar,
        Stack,
        Button
      }}
    />
  );
}
