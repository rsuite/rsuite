import * as React from 'react';
import { Tree } from 'rsuite';

import DefaultPage from '@/components/Page';
import useFetchData from '@/utils/useFetchData';

export default function Page() {
  const { response: data } = useFetchData('city-simplified');
  return <DefaultPage examples={['basic', 'virtualized']} dependencies={{ Tree, data }} />;
}
