import * as React from 'react';
import { InputPicker, Button, Icon } from 'rsuite';
import fetch from 'isomorphic-fetch';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';
import data from '@/resources/data/users';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="InputPicker"
        examples={[
          'basic',
          'size',
          'block',
          'group',
          'creatable',
          'custom',
          'disabled',
          'async',
          'controlled'
        ]}
        dependencies={{ fetch, InputPicker, Button, Icon, data }}
      />
    </Frame>
  );
}
