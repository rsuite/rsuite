import React from 'react';
import { TimeRangePicker, Stack, HStack, VStack, Text, Divider, Button } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['TimeRangePicker']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="time-range-picker" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        TimeRangePicker,
        Stack,
        HStack,
        VStack,
        Text,
        Divider,
        Button
      }}
    />
  );
}
