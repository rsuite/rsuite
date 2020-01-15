import * as React from 'react';
import { CheckTree, Toggle, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';
import { getCity } from '@/resources/data';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'cascade', 'custom', 'virtualized']}
      getDependencies={getCity}
      dependencies={{ CheckTree, Toggle, Icon }}
    />
  );
}
