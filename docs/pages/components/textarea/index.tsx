import React from 'react';
import { Textarea, Divider, Text, VStack, SelectPicker } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Textarea']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Textarea,
        Text,
        Divider,
        VStack,
        SelectPicker
      }}
    />
  );
}
