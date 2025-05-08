import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import { Progress, Button, ButtonGroup, VStack, HStack, Box, Text } from 'rsuite';
import { FaCheckCircle } from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Progress']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Progress, Button, ButtonGroup, VStack, HStack, Box, Text, FaCheckCircle }}
    />
  );
}
