import React from 'react';
import { Slider, RangeSlider, Row, Col, Input, InputNumber, InputGroup } from 'rsuite';
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
      dependencies={{ Slider, RangeSlider, Row, Col, Input, InputNumber, InputGroup }}
      sandboxFiles={files}
    />
  );
}
