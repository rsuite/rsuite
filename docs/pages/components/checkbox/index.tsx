import * as React from 'react';
import { Form, FormGroup, Button, Checkbox, CheckboxGroup, Icon } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Checkbox"
        examples={[
          'basic',
          'disabled',
          'indeterminate',
          'checkbox-group',
          'checkbox-groupinline',
          'checkbox-group-controller'
        ]}
        dependencies={{ Form, FormGroup, Button, Checkbox, CheckboxGroup, Icon }}
      />
    </Frame>
  );
}
