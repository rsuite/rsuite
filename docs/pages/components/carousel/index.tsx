import React from 'react';
import { Carousel, SegmentedControl, Divider, Text } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Carousel']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Carousel, SegmentedControl, Divider, Text }}
    />
  );
}
