import * as React from 'react';
import { Form, Button, Checkbox, CheckboxGroup, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Form, Button, Checkbox, CheckboxGroup, Icon }} />;
}
