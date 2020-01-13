import * as React from 'react';
import { CheckPicker, Button, Icon, Checkbox, RadioGroup, Radio } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import data from '@/resources/data/users';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="CheckPicker"
        examples={[
          'basic',
          'appearance',
          'size',
          'sticky',
          'block',
          'group',
          'placement',
          'custom',
          'disabled',
          'searchable',
          'extra-footer',
          'async',
          'container',
          'controlled'
        ]}
        dependencies={{
          CheckPicker,
          Button,
          Icon,
          Checkbox,
          RadioGroup,
          Radio,
          data,
          PreventOverflowContainer
        }}
      />
    </Frame>
  );
}
