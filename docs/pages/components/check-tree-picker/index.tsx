import React, { useState } from 'react';
import { CheckTreePicker, Button, Toggle } from 'rsuite';
import Spinner from '@rsuite/icons/legacy/Spinner';

import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('city-simplified');
  return (
    <DefaultPage dependencies={{ data, CheckTreePicker, Button, Toggle, useState, Spinner }} />
  );
}
