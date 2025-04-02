import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import PlacementGrid from '@/components/PlacementGrid';
import { Tooltip, Whisper, Button, ButtonToolbar, Text, Loader, HStack } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => (
    <ImportGuide components={['Tooltip', 'Whisper']} hasCssComponents={['Tooltip']} />
  )
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Whisper,
        Tooltip,
        ButtonToolbar,
        Text,
        Loader,
        HStack,
        Button,
        PlacementGrid
      }}
    />
  );
}
