import React from 'react';
import { InputPicker, Button } from 'rsuite';
import Spinner from '@rsuite/icons/legacy/Spinner';

import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('users-role');
  return <DefaultPage dependencies={{ data, InputPicker, Button, Spinner }} />;
}
