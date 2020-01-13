import * as React from 'react';
import { default as dateFns } from 'date-fns';
import { Calendar, Button, Tag, Popover, Whisper, Badge } from 'rsuite';

import PageContent from '@/components/PageContent';
import Frame from '@/components/Frame';

export default function Page() {
  return (
    <Frame>
      <PageContent
        id="Calendar"
        examples={['basic', 'compact']}
        dependencies={{ dateFns, Calendar, Button, Tag, Popover, Whisper, Badge }}
      />
    </Frame>
  );
}
