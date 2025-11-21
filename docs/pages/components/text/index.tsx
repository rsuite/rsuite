import React from 'react';
import { Text, Stack, Divider, Box } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Text']} />
};

export default function Page() {
  return (
    <DefaultPage inDocsComponents={inDocsComponents} dependencies={{ Text, Stack, Divider, Box }} />
  );
}
