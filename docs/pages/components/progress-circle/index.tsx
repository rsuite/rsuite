import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import { ProgressCircle, Button, ButtonGroup, VStack, HStack, Box, Text } from 'rsuite';
import { FaCheckCircle } from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['ProgressCircle']} />,

};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        ProgressCircle,
        Button,
        ButtonGroup,
        VStack,
        HStack,
        Box,
        Text,
        FaCheckCircle
      }}
    />
  );
}
