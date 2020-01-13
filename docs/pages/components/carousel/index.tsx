import * as React from 'react';
import { Carousel, Radio, RadioGroup, Divider } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Carousel"
        examples={['basic', 'appearance', 'autoplay']}
        dependencies={{ Carousel, Radio, RadioGroup, Divider }}
      />
    </Frame>
  );
}
