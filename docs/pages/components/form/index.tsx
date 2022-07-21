import React from 'react';
import {
  Form,
  Button,
  ButtonGroup,
  ButtonToolbar,
  CheckboxGroup,
  RadioGroup,
  Checkbox,
  Radio,
  CheckPicker,
  InputGroup,
  InputNumber,
  Toggle,
  Panel,
  Modal,
  SelectPicker,
  Slider,
  DatePicker,
  DateRangePicker,
  Input,
  TagPicker,
  InputPicker,
  Cascader,
  MultiCascader,
  Message,
  Rate,
  Uploader
} from 'rsuite';

import DefaultPage from '@/components/Page';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';

import { mockTreeData, mockTreeDataToString } from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: mockTreeDataToString
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Form,
        Input,
        InputGroup,
        InputNumber,
        Toggle,
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
        Modal,
        Slider,
        DatePicker,
        DateRangePicker,
        TagPicker,
        InputPicker,
        Cascader,
        MultiCascader,
        Message,
        Rate,
        Uploader,
        mockTreeData,
        AvatarIcon
      }}
      sandboxFiles={[mockfile]}
    />
  );
}
