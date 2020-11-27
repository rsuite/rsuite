import React from 'react';
import { AutoComplete, InputGroup } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ AutoComplete, InputGroup }} />;
}
