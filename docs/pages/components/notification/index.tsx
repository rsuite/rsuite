import React from 'react';
import {
  Notification,
  Button,
  ButtonToolbar,
  SelectPicker,
  useToaster,
  Uploader,
  Placeholder
} from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Notification,
        Button,
        ButtonToolbar,
        SelectPicker,
        useToaster,
        Uploader,
        Placeholder
      }}
    />
  );
}
