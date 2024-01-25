import React from 'react';
import { Badge, Button, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Badge']} />
};

export default function Page() {
  return (
    <DefaultPage inDocsComponents={inDocsComponents} dependencies={{ Badge, Button, Toggle }} />
  );
}
