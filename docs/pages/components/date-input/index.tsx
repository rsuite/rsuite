import React from 'react';
import { DateInput, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        DateInput,
        Stack
      }}
    />
  );
}
