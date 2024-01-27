import React from 'react';
import { Loader, Placeholder } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Loader']} />
};

export default function Page() {
  return <DefaultPage inDocsComponents={inDocsComponents} dependencies={{ Loader, Placeholder }} />;
}
