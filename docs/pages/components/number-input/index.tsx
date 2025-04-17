/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
// @ts-ignore
import { NumberInput, InputGroup, Stack } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['NumberInput']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ NumberInput, InputGroup, Stack }}
    />
  );
}
