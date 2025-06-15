import React from 'react';
import { TagInput, VStack, HStack, Text, Divider } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['TagInput']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ TagInput, VStack, HStack, Text, Divider }}
    />
  );
}
