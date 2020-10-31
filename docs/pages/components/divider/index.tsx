import React from 'react';
import { Divider, Button, ButtonGroup } from 'rsuite';

import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Divider, Button, ButtonGroup }} />;
}
