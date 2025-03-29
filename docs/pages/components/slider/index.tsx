import React from 'react';
import {
  Slider,
  RangeSlider,
  Input,
  InputNumber,
  InputGroup,
  Box,
  Center,
  HStack,
  VStack,
  Radio,
  RadioGroup
} from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

import files from './files';

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
        InputNumber,
        InputGroup,
        Center,
        Box,
        HStack,
        VStack,
        Radio,
        RadioGroup
      }}
      sandboxFiles={files}
    />
  );
}
