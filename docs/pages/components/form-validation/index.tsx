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
  Rate,
  Uploader,
  toaster,
  FlexboxGrid,
  IconButton
} from 'rsuite';

import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import files from './files';

const JSONTree = loadable(() => import('react-json-tree'));
const MaskedInput = loadable(() => import('react-text-mask'));

const sandboxDependencies = {
  'react-json-tree': '^0.15.0',
  'react-text-mask': '^5.4.3'
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
        MaskedInput,
        Slider,
        DatePicker,
        Message,
        toaster,
        Rate,
        Uploader,
        FlexboxGrid,
        IconButton,
        PlusIcon,
        MinusIcon
      }}
      sandboxDependencies={sandboxDependencies}
      sandboxFiles={files}
    />
  );
}
