import React from 'react';
import { TagPicker, Button } from 'rsuite';
import lodashRemove from 'lodash/remove';
import fetch from 'isomorphic-fetch';
import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';
import Spinner from '@rsuite/icons/legacy/Spinner';
import User from '@rsuite/icons/legacy/User';
import Group from '@rsuite/icons/legacy/Group';

export default function Page() {
  const { response: data } = useFetchData('users-role');
  return (
    <DefaultPage
      dependencies={{ TagPicker, Button, Spinner, lodashRemove, data, fetch, User, Group }}
    />
  );
}
