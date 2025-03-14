import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import { Kbd, Text, VStack, HStack } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Kbd']} />
};

export default function Page() {
  return (
    <DefaultPage inDocsComponents={inDocsComponents} dependencies={{ Kbd, Text, VStack, HStack }} />
  );
}
