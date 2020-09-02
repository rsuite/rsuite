import * as React from 'react';
import { TagPicker, Button, Icon, Tag } from 'rsuite';
import _remove from 'lodash/remove';
import fetch from 'isomorphic-fetch';
import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('users-role');
  return (
    <DefaultPage
      examples={['basic', 'size', 'block', 'group', 'creatable', 'custom', 'disabled', 'async']}
      dependencies={{ TagPicker, Tag, Button, Icon, _remove, data, fetch }}
    />
  );
}
