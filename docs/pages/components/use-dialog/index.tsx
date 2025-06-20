import React from 'react';
import DefaultPage from '@/components/layout/Page';
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
