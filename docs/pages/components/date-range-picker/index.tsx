import React from 'react';
import * as dateFns from 'date-fns';
import { DateRangePicker, Button, Divider } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ DateRangePicker, Button, Divider, dateFns }} />;
}
