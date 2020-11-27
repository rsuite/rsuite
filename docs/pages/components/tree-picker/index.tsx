import React, { useState } from 'react';
import { TreePicker, Button } from 'rsuite';
import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';
import Spinner from '@rsuite/icons/legacy/Spinner';

export default function Page() {
  const { response: data } = useFetchData('city-simplified');
  return <DefaultPage dependencies={{ TreePicker, Button, Spinner, data, useState }} />;
}
