import * as React from 'react';
import { Loader } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'content', 'size', 'speed', 'center', 'backdrop', 'inverse']}
      dependencies={{ Loader }}
    />
  );
}
