import React from 'react';
import { DateRangeInput, Stack, InputGroup } from 'rsuite';
import CalendarIcon from '@rsuite/icons/Calendar';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        CalendarIcon,
        DateRangeInput,
        InputGroup,
        Stack
      }}
    />
  );
}
