import React from 'react';
import { Placeholder } from 'rsuite';

import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Placeholder']} />
};

export default function Page() {
  return <DefaultPage inDocsComponents={inDocsComponents} dependencies={{ Placeholder }} />;
}
