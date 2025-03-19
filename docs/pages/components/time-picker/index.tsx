import React from 'react';
import { TimePicker, Stack, Box } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['TimePicker']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        TimePicker,
        Stack,
        Box
      }}
      sandboxDependencies={{ 'date-fns': '^4.1.0' }}
    />
  );
}
