import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import { InputNumber, InputGroup, Stack } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['InputNumber']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ InputNumber, InputGroup, Stack }}
    />
  );
}
