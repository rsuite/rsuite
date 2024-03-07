import React from 'react';
import { InputNumber, InputGroup, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

import files from './files';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['InputNumber']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ InputNumber, InputGroup, Stack }}
      sandboxFiles={files}
    />
  );
}
