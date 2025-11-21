import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import { MdEmail } from 'react-icons/md';
import { Center, Box, HStack, VStack, Text } from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Center']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Center, Box, HStack, VStack, Text, MdEmail }}
    />
  );
}
