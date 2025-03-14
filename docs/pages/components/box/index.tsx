/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import { Box, HStack, VStack } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Box']} />
};

export default function Page() {
  return <DefaultPage inDocsComponents={inDocsComponents} dependencies={{ Box, HStack, VStack }} />;
}
