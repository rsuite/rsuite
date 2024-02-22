import React from 'react';
import {
  InlineEdit,
  Stack,
  Input,
  InputPicker,
  TagPicker,
  DatePicker,
  Slider,
  RangeSlider,
  InputNumber,
  Cascader,
  Panel,
  Form
} from 'rsuite';
import ImportGuide from '@/components/ImportGuide';
import DefaultPage from '@/components/Page';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['InlineEdit']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Form,
        InlineEdit,
        Stack,
        Panel,
        Input,
        InputPicker,
        TagPicker,
        DatePicker,
        Slider,
        RangeSlider,
        InputNumber,
        Cascader
      }}
    />
  );
}
