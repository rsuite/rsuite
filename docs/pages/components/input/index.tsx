import * as React from 'react';
import { Input, InputNumber, InputGroup, Icon, Whisper, Tooltip, Grid, Row, Col } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Input"
        examples={[
          'basic',
          'size',
          'textarea',
          'disabled',
          'input-group',
          'input-group-inside',
          'input-group-button',
          'tooltip'
        ]}
        dependencies={{ Input, InputNumber, InputGroup, Icon, Whisper, Tooltip, Grid, Row, Col }}
      />
    </Frame>
  );
}
