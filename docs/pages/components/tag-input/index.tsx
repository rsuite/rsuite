import React from 'react';
import { TagInput } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['TagInput']} />
};

export default function Page() {
  return <DefaultPage inDocsComponents={inDocsComponents} dependencies={{ TagInput }} />;
}
