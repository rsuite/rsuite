import React from 'react';
import DefaultPage from '@/components/Page';
import { Modal, Button, Drawer, HStack } from 'rsuite';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { alert, confirm, prompt } from '@rsuite/interactions';

const sandboxDependencies = {
  formik: '^2.4.5',
  yup: '^1.3.3'
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        HStack,
        Modal,
        Button,
        Drawer,
        alert,
        confirm,
        prompt,
        NiceModal,
        useModal
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
