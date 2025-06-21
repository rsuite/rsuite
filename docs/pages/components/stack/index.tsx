import React from 'react';
import {
  Stack,
  HStack,
  VStack,
  Divider,
  Slider,
  SelectPicker,
  Text,
  Center,
  useMediaQuery
} from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';

const inDocsComponents = {
  'import-guide': () => (
    <ImportGuide components={['Stack', 'HStack', 'VStack']} hasCssComponents={['Stack']} />
  ),
  'example-responsive': () => <Simulation example="responsive" componentName="stack" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Stack,
        HStack,
        VStack,
        Divider,
        Slider,
        Text,
        Center,
        SelectPicker,
        useMediaQuery
      }}
    />
  );
}
