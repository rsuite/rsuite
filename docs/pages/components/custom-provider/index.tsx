import React from 'react';
import ImportGuide from '@/components/ImportGuide';
import DefaultPage from '@/components/layout/Page';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['CustomProvider']} />
};

export default function Page() {
  return <DefaultPage inDocsComponents={inDocsComponents} />;
}
