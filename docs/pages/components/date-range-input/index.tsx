import React from 'react';
import { DateRangeInput, Stack, InputGroup } from 'rsuite';
import CalendarIcon from '@rsuite/icons/Calendar';
import DefaultPage from '@/components/Page';
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
        Stack
      }}
    />
  );
}
