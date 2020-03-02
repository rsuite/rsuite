import * as React from 'react';
import { InputPicker, Button, Icon } from 'rsuite';

import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('users-role');
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
      dependencies={{ data, InputPicker, Button, Icon }}
    />
  );
}
