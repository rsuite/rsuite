import * as React from 'react';
import { ButtonToolbar, Button, Modal, Icon, Toggle, RadioGroup, Radio, Loader } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'backdrop', 'size', 'full', 'overflow', 'dynamic', 'confirm']}
      dependencies={{
        Loader,
        ButtonToolbar,
        Button,
        Modal,
        Icon,
        Toggle,
        RadioGroup,
        Radio
      }}
    />
  );
}
