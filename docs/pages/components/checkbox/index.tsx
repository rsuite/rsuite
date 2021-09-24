import React from 'react';
import { Form, Button, Checkbox, CheckboxGroup } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Form, Button, Checkbox, CheckboxGroup }} />;
}
