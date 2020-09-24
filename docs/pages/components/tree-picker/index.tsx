import React, { useState } from 'react';
import { TreePicker, Button, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('city-simplified');
  return <DefaultPage dependencies={{ TreePicker, Button, Icon, data, useState }} />;
}
