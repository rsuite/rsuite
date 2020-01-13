import * as React from 'react';
import { InputNumber } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="InputNumber"
        examples={['basic', 'size', 'decimals', 'max-min', 'step', 'disabled', 'fix', 'control']}
        dependencies={{ InputNumber }}
      />
    </Frame>
  );
}
