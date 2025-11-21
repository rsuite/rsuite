import React from 'react';
import {
  Message,
  Notification,
  Button,
  ButtonToolbar,
  SelectPicker,
  useToaster,
  Placeholder,
  Divider
} from 'rsuite';
import DefaultPage from '@/components/layout/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Message,
        Notification,
        Button,
        ButtonToolbar,
        SelectPicker,
        useToaster,
        Placeholder,
        Divider
      }}
    />
  );
}
