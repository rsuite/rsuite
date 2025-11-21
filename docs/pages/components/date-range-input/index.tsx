import React from 'react';
import { DateRangeInput, Stack, InputGroup, Button, HStack, VStack, Text, Divider } from 'rsuite';
import CalendarIcon from '@rsuite/icons/Calendar';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['DateRangeInput']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        CalendarIcon,
        DateRangeInput,
        InputGroup,
        Button,
        Stack,
        HStack,
        VStack,
        Text,
        Divider
      }}
    />
  );
}
