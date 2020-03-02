import * as React from 'react';
import { Placeholder } from 'rsuite';

import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage examples={['paragraph', 'grid', 'graph']} dependencies={{ Placeholder }} />;
}
