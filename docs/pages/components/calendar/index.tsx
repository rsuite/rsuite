import React from 'react';

import { Calendar, Button, Tag, Popover, Whisper, Badge } from 'rsuite';
import DefaultPage from '@/components/Page';
import files from './files';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'compact']}
      dependencies={{ Calendar, Button, Tag, Popover, Whisper, Badge }}
      sandboxFiles={files}
    />
  );
}
