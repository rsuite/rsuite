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
  Form,
  Box
} from 'rsuite';
import ImportGuide from '@/components/ImportGuide';
import DefaultPage from '@/components/layout/Page';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['InlineEdit']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Box,
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
