import React, { useState } from 'react';
import { CheckTreePicker, Button, Icon, Toggle } from 'rsuite';

import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('city-simplified');
  return <DefaultPage dependencies={{ data, CheckTreePicker, Button, Icon, Toggle, useState }} />;
}
