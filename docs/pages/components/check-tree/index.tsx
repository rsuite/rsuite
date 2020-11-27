import React, { useState } from 'react';
import { CheckTree, Toggle } from 'rsuite';
import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';
import MapMarker from '@rsuite/icons/legacy/MapMarker';

export default function Page() {
  const { response: data } = useFetchData('city-simplified');
  return <DefaultPage dependencies={{ data, CheckTree, Toggle, useState, MapMarker }} />;
}
