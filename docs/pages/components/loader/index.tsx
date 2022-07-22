import React from 'react';
import { Loader, Placeholder } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Loader, Placeholder }} />;
}
