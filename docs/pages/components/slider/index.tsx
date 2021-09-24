import React from 'react';
import { Slider, RangeSlider, Row, Col, Input, InputNumber, InputGroup } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage dependencies={{ Slider, RangeSlider, Row, Col, Input, InputNumber, InputGroup }} />
  );
}
