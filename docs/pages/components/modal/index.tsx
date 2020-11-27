import React from 'react';
import { ButtonToolbar, Button, Modal, Toggle, RadioGroup, Radio, Loader } from 'rsuite';
import DefaultPage from '@/components/Page';
import Remind from '@rsuite/icons/legacy/Remind';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Loader,
        ButtonToolbar,
        Button,
        Modal,
        Toggle,
        RadioGroup,
        Radio,
        Remind,
      }}
    />
  );
}
