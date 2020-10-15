import React from 'react';
import * as dateFns from 'date-fns';
import { DatePicker, Button, InputGroup } from 'rsuite';
import TimeZonePicker from '@rsuite/timezone-picker';

import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={[
        'basic',
        'size',
        'one-tap',
        'appearance',
        'block',
        'placeholder',
        'format',
        'format-month',
        'format-time',
        'format-time-meridian',
        'iso-week',
        'disabled',
        'intl',
        'placement',
        'custom',
        'control',
        'range',
        'show-week-numbers',
        'time-zone',
        'time-zone-with-picker'
      ]}
      dependencies={{ DatePicker, Button, InputGroup, dateFns, TimeZonePicker }}
    />
  );
}
