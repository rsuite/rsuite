import React from 'react';
import { DateInput, Stack, InputGroup } from 'rsuite';
import CalendarIcon from '@rsuite/icons/Calendar';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        CalendarIcon,
        DateInput,
        InputGroup,
        Stack
      }}
    />
  );
}
