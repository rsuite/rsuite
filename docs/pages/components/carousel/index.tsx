import React from 'react';
import { Carousel, Radio, RadioGroup, Divider } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Carousel']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Carousel, Radio, RadioGroup, Divider }}
    />
  );
}
