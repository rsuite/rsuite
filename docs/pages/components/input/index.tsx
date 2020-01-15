import * as React from 'react';
import { Input, InputNumber, InputGroup, Icon, Whisper, Tooltip, Grid, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
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
  );
}
