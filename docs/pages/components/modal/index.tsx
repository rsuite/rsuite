/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import Simulation from '@/components/Simulation';
import DefaultPage from '@/components/layout/Page';
import RemindFillIcon from '@rsuite/icons/RemindFill';
import ImportGuide from '@/components/ImportGuide';
import {
  ButtonToolbar,
  Button,
  Modal,
  Toggle,
  RadioGroup,
  Radio,
  Loader,
  // @ts-ignore
  PasswordInput,
  // @ts-ignore
  PasswordStrengthMeter,
  Placeholder,
  Form,
  Input,
  SelectPicker,
  HStack,
  Text
} from 'rsuite';
const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Modal']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="modal" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Loader,
        ButtonToolbar,
        Button,
        Modal,
        Toggle,
        RadioGroup,
        Radio,
        Form,
        Input,
        HStack,
        Text,
        SelectPicker,
        RemindFillIcon,
        PasswordInput,
        PasswordStrengthMeter,
        Placeholder
      }}
    />
  );
}
