import React from 'react';
import { DateInput, Stack, InputGroup } from 'rsuite';
import CalendarIcon from '@rsuite/icons/Calendar';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['DateInput']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        CalendarIcon,
        DateInput,
        InputGroup,
        Stack
      }}
    />
  );
}
