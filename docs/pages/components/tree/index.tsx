import * as React from 'react';
import { Tree } from 'rsuite';

const { useState } = React;

import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('city-simplified');
  return (
    <DefaultPage
      examples={['basic', 'draggable', 'virtualized']}
      dependencies={{ useState, Tree, data }}
    />
  );
}
