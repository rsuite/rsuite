import React from 'react';
import { Pagination, Button, Toggle, Divider } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Pagination, Button, Toggle, Divider }} />;
}
