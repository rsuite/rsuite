import * as React from 'react';
import dateFns from 'date-fns';
import { DatePicker, Button, InputGroup } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="DatePicker"
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
          'iso-week',
          'disabled',
          'intl',
          'placement',
          'custom',
          'control',
          'range',
          'show-week-numbers'
        ]}
        dependencies={{ DatePicker, Button, InputGroup, dateFns }}
      />
    </Frame>
  );
}
