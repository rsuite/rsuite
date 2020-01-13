import * as React from 'react';
import { Form, FormGroup, RadioGroup, Icon, Button, Radio } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Radio"
        examples={[
          'basic',
          'disabled',
          'radio-group',
          'radio-group-inline',
          'radio-group-inline-picker',
          'radio-group-controller'
        ]}
        dependencies={{ Form, FormGroup, RadioGroup, Icon, Button, Radio }}
      />
    </Frame>
  );
}
