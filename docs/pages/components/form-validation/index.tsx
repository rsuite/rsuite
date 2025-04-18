import React from 'react';
import loadable from '@loadable/component';
import DefaultPage from '@/components/layout/Page';
import {
  Form,
  Button,
  ButtonGroup,
  ButtonToolbar,
  CheckboxGroup,
  RadioGroup,
  Checkbox,
  Radio,
  Schema,
  CheckPicker,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  NumberInput,
  PasswordInput,
  Panel,
  SelectPicker,
  Slider,
  DatePicker,
  Input,
  Message,
  Uploader,
  toaster,
  IconButton,
  Toggle,
  Box,
  Row,
  Col
} from 'rsuite';

import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import files from './files';
import { JSONTree } from 'react-json-tree';

const Select = loadable(() => import('react-select'));

const sandboxDependencies = {
  'react-json-tree': '^0.15.0',
  'react-select': '^5.4.0'
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Schema,
        Form,
        Input,
        NumberInput,
        Button,
        ButtonGroup,
        ButtonToolbar,
        CheckboxGroup,
        CheckPicker,
        SelectPicker,
        RadioGroup,
        Checkbox,
        PasswordInput,
        Panel,
        Radio,
        JSONTree,
        Select,
        Slider,
        DatePicker,
        Message,
        toaster,
        Uploader,
        Row,
        Col,
        IconButton,
        PlusIcon,
        MinusIcon,
        Toggle,
        Box
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={files}
    />
  );
}
