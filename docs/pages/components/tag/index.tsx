import React from 'react';
import { Tag, TagGroup, IconButton, Input } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import PlusIcon from '@rsuite/icons/Plus';
import files from './files';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Tag', 'TagGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Tag, TagGroup, IconButton, Input, PlusIcon }}
      sandboxFiles={files}
    />
  );
}
