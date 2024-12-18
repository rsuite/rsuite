import React from 'react';
import { Highlight, Input, List } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Highlight']} />
};

export default function Page() {
  return (
    <DefaultPage inDocsComponents={inDocsComponents} dependencies={{ Highlight, Input, List }} />
  );
}
