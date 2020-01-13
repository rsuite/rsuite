import * as React from 'react';
import dateFns from 'date-fns';
import { DateRangePicker, Button, Divider } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="DateRangePicker"
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
    </Frame>
  );
}
