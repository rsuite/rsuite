import React from 'react';
import { TagPicker, Button, Icon } from 'rsuite';
import lodashRemove from 'lodash/remove';
import fetch from 'isomorphic-fetch';
import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('users-role');
  return <DefaultPage dependencies={{ TagPicker, Button, Icon, lodashRemove, data, fetch }} />;
}
