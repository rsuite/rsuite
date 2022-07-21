import React from 'react';
import { DateRangePicker, Button, Divider } from 'rsuite';
import DefaultPage from '@/components/Page';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import isAfter from 'date-fns/isAfter';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ DateRangePicker, Button, Divider, addDays, subDays, isAfter }}
      sandboxDependencies={{ 'date-fns': '^2.13.0' }}
    />
  );
}
