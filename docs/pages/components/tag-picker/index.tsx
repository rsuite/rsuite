import * as React from 'react';
import { TagPicker, Button, Icon } from 'rsuite';
import _remove from 'lodash/remove';
import fetch from 'isomorphic-fetch';
import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('users-role');
  return (
    <DefaultPage
      examples={['basic', 'size', 'block', 'group', 'creatable', 'custom', 'disabled', 'async']}
      dependencies={{ TagPicker, Button, Icon, _remove, data, fetch }}
    />
  );
}
