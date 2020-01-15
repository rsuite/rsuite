import * as React from 'react';
import { Carousel, Radio, RadioGroup, Divider } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      id="Carousel"
      examples={['basic', 'appearance', 'autoplay']}
      dependencies={{ Carousel, Radio, RadioGroup, Divider }}
    />
  );
}
