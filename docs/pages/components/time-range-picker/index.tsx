import React from 'react';
import { TimeRangePicker, Stack, Box } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['TimeRangePicker']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        TimeRangePicker,
        Stack,
        Box
      }}
    />
  );
}
