import React from 'react';
import { Input, InputNumber, InputGroup, Icon, Whisper, Tooltip, Grid, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{ Input, InputNumber, InputGroup, Icon, Whisper, Tooltip, Grid, Row, Col }}
    />
  );
}
