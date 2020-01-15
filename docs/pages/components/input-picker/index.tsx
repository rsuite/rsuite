import * as React from 'react';
import { InputPicker, Button, Icon } from 'rsuite';
import fetch from 'isomorphic-fetch';

import DefaultPage from '@/components/Page';
import data from '@/resources/data/users';

export default function Page() {
  return (
    <DefaultPage
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
  );
}
