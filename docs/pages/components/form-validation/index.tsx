import React from 'react';
import loadable from '@loadable/component';
import DefaultPage from '@/components/Page';
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
  InputNumber,
  Panel,
  SelectPicker,
  Slider,
  DatePicker,
  Input,
  Message,
  Uploader,
  toaster,
  FlexboxGrid,
  IconButton,
  Toggle
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
        InputNumber,
        Button,
        ButtonGroup,
        ButtonToolbar,
        CheckboxGroup,
        CheckPicker,
        SelectPicker,
        RadioGroup,
        Checkbox,
        Panel,
        Radio,
        JSONTree,
        Select,
        Slider,
        DatePicker,
        Message,
        toaster,
        Uploader,
        FlexboxGrid,
        IconButton,
        PlusIcon,
        MinusIcon,
        Toggle
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={files}
    />
  );
}
