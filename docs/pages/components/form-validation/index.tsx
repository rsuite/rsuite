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
  SegmentedControl,
  CheckPicker,
  useFormControl,
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
import {
  SchemaModel,
  StringType,
  ObjectType,
  NumberType,
  ArrayType,
  BooleanType
} from 'rsuite/Schema';

import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import { JSONView } from '@/components/JSONView';

const Select = loadable(() => import('react-select'));

const sandboxDependencies = {
  'react-json-tree': '^0.15.0',
  'react-select': '^5.4.0'
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        SchemaModel,
        StringType,
        ObjectType,
        NumberType,
        ArrayType,
        BooleanType,
        JSONView,
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
        SegmentedControl,
        Checkbox,
        PasswordInput,
        Panel,
        Radio,
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
        Box,
        useFormControl
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
