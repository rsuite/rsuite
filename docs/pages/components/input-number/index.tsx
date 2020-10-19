import React from 'react';
import { InputNumber, InputGroup } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ InputNumber, InputGroup }} />;
}
