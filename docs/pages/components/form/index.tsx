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
import useFetchData from '@/utils/useFetchData';
import Avatar from '@rsuite/icons/legacy/Avatar';

export default function Page() {
  const { response: data } = useFetchData('province-simplified');
  const { response: pickerData } = useFetchData('users-role');
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
        pickerData,
        Cascader,
        MultiCascader,
        Message,
        data,
        Rate,
        Uploader,
        Avatar
      }}
    />
  );
}
