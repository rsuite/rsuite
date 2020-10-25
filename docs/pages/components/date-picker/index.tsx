import React from 'react';
import * as dateFns from 'date-fns';
import { DatePicker, Button, InputGroup, Input } from 'rsuite';
import TimeZonePicker from '@rsuite/timezone-picker';

import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ DatePicker, Button, InputGroup, dateFns, TimeZonePicker, Input }}
    />
  );
}
