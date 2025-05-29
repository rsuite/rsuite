import React from 'react';
import DefaultPage from '@/components/layout/Page';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useDialog, Button, Modal, Input, Textarea, VStack } from 'rsuite';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        useDialog,
        Button,
        Modal,
        Input,
        Textarea,
        VStack
      }}
    />
  );
}
