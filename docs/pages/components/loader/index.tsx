import React from 'react';
import { Loader } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Loader }} />;
}
