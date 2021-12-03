import React from 'react';
import { Tree, Button, InputNumber, Panel } from 'rsuite';

const { useState } = React;

import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('city-simplified');
  return <DefaultPage dependencies={{ useState, Button, InputNumber, Tree, data, Panel }} />;
}
