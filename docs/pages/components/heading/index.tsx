import React from 'react';
import { Heading, HeadingGroup, Text, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Heading', 'HeadingGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Heading, HeadingGroup, Text, Stack }}
    />
  );
}
