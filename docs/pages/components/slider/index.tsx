import React from 'react';
import {
  Slider,
  RangeSlider,
  Input,
  NumberInput,
  InputGroup,
  Box,
  Center,
  HStack,
  VStack,
  Text,
  Radio,
  RadioGroup
} from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Slider', 'RangeSlider']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Slider,
        RangeSlider,
        Input,
        NumberInput,
        InputGroup,
        Center,
        Box,
        HStack,
        VStack,
        Text,
        Radio,
        RadioGroup
      }}
    />
  );
}
