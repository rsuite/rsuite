import * as React from 'react';
import { Tree } from 'rsuite';

import DefaultPage from '@/components/Page';
import { getCity } from '@/resources/data';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'virtualized']}
      getDependencies={getCity}
      dependencies={{ Tree }}
    />
  );
}
