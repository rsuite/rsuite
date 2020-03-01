import * as React from 'react';
import { List, Tag, Button, Icon, FlexboxGrid } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['default', 'size', 'bordered', 'hover', 'sortable', 'collection', 'custom']}
      dependencies={{ List, Tag, Button, Icon, FlexboxGrid }}
    />
  );
}
