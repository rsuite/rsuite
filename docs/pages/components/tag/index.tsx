import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import PlusIcon from '@rsuite/icons/Plus';
import { Tag, TagGroup, IconButton, Input, VStack } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Tag', 'TagGroup']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Tag, TagGroup, IconButton, Input, VStack, PlusIcon }}
    />
  );
}
