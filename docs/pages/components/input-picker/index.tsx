import React from 'react';
import { InputPicker, Button, Icon } from 'rsuite';

import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('users-role');
  return <DefaultPage dependencies={{ data, InputPicker, Button, Icon }} />;
}
