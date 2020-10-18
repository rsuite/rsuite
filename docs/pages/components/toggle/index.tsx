import * as React from 'react';
import { Button, Toggle, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Button, Toggle, Icon }} />;
}
