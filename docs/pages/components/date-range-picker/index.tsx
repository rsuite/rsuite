import * as React from 'react';
import dateFns from 'date-fns';
import { DateRangePicker, Button, Divider } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={[
        'basic',
        'appearance',
        'size',
        'block',
        'placeholder',
        'hover-range',
        'one-tap',
        'disabled',
        'toolbar',
        'value',
        'intl',
        'show-week-numbers'
      ]}
      dependencies={{ DateRangePicker, Button, Divider, dateFns }}
    />
  );
}
