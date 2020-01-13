import * as React from 'react';
import { SelectPicker, Button, Icon, RadioGroup, Radio } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import data from '@/resources/data/users';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="SelectPicker"
        examples={[
          'basic',
          'appearance',
          'size',
          'block',
          'group',
          'placement',
          'custom',
          'disabled',
          'searchable',
          'async',
          'container',
          'controlled'
        ]}
        dependencies={{
          PreventOverflowContainer,
          SelectPicker,
          Button,
          Icon,
          data,
          RadioGroup,
          Radio
        }}
      />
    </Frame>
  );
}
