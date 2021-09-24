import React from 'react';
import { Form, RadioGroup, Button, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Form, RadioGroup, Button, Radio }} />;
}
