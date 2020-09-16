import * as React from 'react';
import { Pagination, Button, Icon, Toggle, Divider } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Pagination, Button, Icon, Toggle, Divider }} />;
}
