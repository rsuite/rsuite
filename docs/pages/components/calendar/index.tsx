import * as React from 'react';
import { default as dateFns } from 'date-fns';
import { Calendar, Button, Tag, Popover, Whisper, Badge } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'compact']}
      dependencies={{ dateFns, Calendar, Button, Tag, Popover, Whisper, Badge }}
    />
  );
}
