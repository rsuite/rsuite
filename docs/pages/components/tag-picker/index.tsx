import * as React from 'react';
import { TagPicker, Button, Icon } from 'rsuite';
import _remove from 'lodash/remove';
import fetch from 'isomorphic-fetch';
import DefaultPage from '@/components/Page';
import data from '@/resources/data/users';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'size', 'block', 'group', 'creatable', 'custom', 'disabled', 'async']}
      dependencies={{ TagPicker, Button, Icon, _remove, data, fetch }}
    />
  );
}
