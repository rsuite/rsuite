import React from 'react';
import { Animation, Button, ButtonToolbar } from 'rsuite';
import DefaultPage from '@/components/Page';

import files from './files';

export default function Page() {
  return <DefaultPage dependencies={{ Button, ButtonToolbar, Animation }} sandboxFiles={files} />;
}
