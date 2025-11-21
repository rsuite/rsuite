import React from 'react';
import { TimePicker, Stack, Box, HStack, VStack, Text, Divider, Button } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['TimePicker']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="time-picker" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        TimePicker,
        Stack,
        Box,
        HStack,
        VStack,
        Text,
        Divider,
        Button
      }}
      sandboxDependencies={{ 'date-fns': '^4.1.0' }}
    />
  );
}
