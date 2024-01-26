import React from 'react';
import { Animation, Button, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

import files from './files';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Animation']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Button, ButtonToolbar, Animation }}
      sandboxFiles={files}
    />
  );
}
