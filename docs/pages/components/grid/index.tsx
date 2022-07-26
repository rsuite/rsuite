import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import DefaultPage from '@/components/Page';

import files from './files';

export default function Page() {
  return <DefaultPage dependencies={{ Grid, Row, Col }} sandboxFiles={files} />;
}
