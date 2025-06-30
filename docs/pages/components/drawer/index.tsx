import React from 'react';
import Simulation from '@/components/Simulation';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import { RxArrowUp, RxArrowDown, RxArrowLeft, RxArrowRight } from 'react-icons/rx';
import {
  Textarea,
  ButtonToolbar,
  Button,
  IconButton,
  Drawer,
  SegmentedControl,
  Placeholder,
  SelectPicker,
  Input,
  PasswordInput,
  PasswordStrengthMeter,
  Form,
  Text
} from 'rsuite';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Drawer']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="drawer" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Drawer,
        Placeholder,
        ButtonToolbar,
        Button,
        IconButton,
        SegmentedControl,
        SelectPicker,
        Input,
        PasswordInput,
        PasswordStrengthMeter,
        Form,
        Textarea,
        Text,
        RxArrowUp,
        RxArrowDown,
        RxArrowLeft,
        RxArrowRight
      }}
    />
  );
}
