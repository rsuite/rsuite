import React from 'react';
import { Table } from 'rsuite';
import { faker } from '@faker-js/faker/locale/en';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

import {
  importFakerString,
  mockTreeData,
  mockTreeDataToString,
  sandboxFakerVersion
} from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: [importFakerString, , mockTreeDataToString].join('\n')
};

const sandboxDependencies = {
  ...sandboxFakerVersion
};

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Table']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Table,
        faker,
        mockTreeData
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={[mockfile]}
    />
  );
}
