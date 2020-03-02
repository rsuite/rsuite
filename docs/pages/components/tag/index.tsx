import * as React from 'react';
import { Tag, TagGroup, Icon, IconButton, Input } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'color', 'dynamic']}
      dependencies={{ Tag, TagGroup, Icon, IconButton, Input }}
    />
  );
}
