import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import PlacementGrid from '@/components/PlacementGrid';
import {
  Menu,
  ButtonToolbar,
  Button,
  Whisper,
  Popover,
  Loader,
  Toggle,
  IconButton,
  HStack,
  Text
} from 'rsuite';

const inDocsComponents = {
  'import-guide': () => (
    <ImportGuide components={['Popover', 'Whisper']} hasCssComponents={['Popover']} />
  )
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        ButtonToolbar,
        Button,
        IconButton,
        Whisper,
        Popover,
        Menu,
        Loader,
        Toggle,
        Text,
        PlacementGrid,
        HStack
      }}
    />
  );
}
