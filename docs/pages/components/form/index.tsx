import React from 'react';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import VisibleIcon from '@rsuite/icons/Visible';
import {
  Textarea,
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  NumberInput,
  PasswordInput,
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
  Uploader,
  HStack,
  VStack,
  Box
} from 'rsuite';

import { mockTreeData, mockTreeDataToString } from '@/utils/mock';

const mockfile = {
  name: 'mock.js',
  content: mockTreeDataToString
};

const inDocsComponents = {
  'import-guide': () => (
    <ImportGuide
      components={['Form']}
      hasCssComponents={[
        'Form',
        'FormStack',
        'FormControl',
        'FormControlLabel',
        'FormErrorMessage',
        'FormHelpText',
        'FormGroup'
      ]}
    />
  )
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Textarea,
        Form,
        Input,
        InputGroup,
        NumberInput,
        Toggle,
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
        HStack,
        VStack,
        Box,
        mockTreeData,
        EyeCloseIcon,
        VisibleIcon,
        AvatarIcon
      }}
      sandboxFiles={[mockfile]}
    />
  );
}
