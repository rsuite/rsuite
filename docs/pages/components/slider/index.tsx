import * as React from 'react';
import { Slider, RangeSlider, Row, Col, Input, InputNumber, InputGroup } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Slider"
        examples={[
          'basic',
          'progress',
          'graduated',
          'vertical',
          'disabled',
          'value',
          'custom',
          'size'
        ]}
        dependencies={{ Slider, RangeSlider, Row, Col, Input, InputNumber, InputGroup }}
      />
    </Frame>
  );
}
