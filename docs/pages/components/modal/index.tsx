import React from 'react';
import Simulation from '@/components/Simulation';
import DefaultPage from '@/components/layout/Page';
import RemindFillIcon from '@rsuite/icons/RemindFill';
import ImportGuide from '@/components/ImportGuide';
import {
  ButtonToolbar,
  Button,
  IconButton,
  Modal,
  Toggle,
  SegmentedControl,
  Loader,
  PasswordInput,
  PasswordStrengthMeter,
  Placeholder,
  Form,
  Input,
  SelectPicker,
  Textarea,
  HStack,
  Text,
  Box,
  Image,
  Link
} from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';

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
        IconButton,
        Modal,
        Toggle,
        SegmentedControl,
        Form,
        Input,
        HStack,
        Text,
        Link,
        Box,
        Image,
        Textarea,
        SelectPicker,
        RemindFillIcon,
        PasswordInput,
        PasswordStrengthMeter,
        Placeholder,
        CloseIcon
      }}
    />
  );
}
