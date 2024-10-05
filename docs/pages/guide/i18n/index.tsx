import React from 'react';
import {
  Calendar,
  SelectPicker,
  DatePicker,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  TimePicker,
  CustomProvider,
  Stack,
  Divider
} from 'rsuite';
import DefaultPage from '@/components/Page';
import * as locales from 'rsuite/locales';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        CustomProvider,
        Calendar,
        SelectPicker,
        DatePicker,
        TimePicker,
        Stack,
        Divider,
        locales
      }}
    />
  );
}
