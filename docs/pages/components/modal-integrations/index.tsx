import React from 'react';
import DefaultPage from '@/components/layout/Page';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal, Button, Drawer } from 'rsuite';

const sandboxDependencies = {
  formik: '^2.4.5',
  yup: '^1.3.3'
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Modal,
        Button,
        Drawer,
        NiceModal,
        useModal
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
