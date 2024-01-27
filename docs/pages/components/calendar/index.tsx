import React from 'react';

import { Calendar, Button, Tag, Popover, Whisper, Badge } from 'rsuite';
import DefaultPage from '@/components/Page';
import files from './files';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Calendar']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      examples={['basic', 'compact']}
      dependencies={{ Calendar, Button, Tag, Popover, Whisper, Badge }}
      sandboxFiles={files}
    />
  );
}
