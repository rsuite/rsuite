/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
// @ts-ignore
import { PinInput, VStack, HStack, Text } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['PinInput']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ PinInput, VStack, HStack, Text }}
    />
  );
}
