import React from 'react';
import { Uploader, Icon, Button, Loader, Message, toaster } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Uploader, Icon, Button, Loader, Message, toaster }} />;
}
