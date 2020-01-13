import * as React from 'react';
import { ButtonToolbar, Button, Modal, Icon, Toggle, RadioGroup, Radio, Loader } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Modal"
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
    </Frame>
  );
}
