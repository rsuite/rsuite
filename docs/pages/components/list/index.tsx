import * as React from 'react';
import {List, Tag, Button, Icon, IconButton, FlexboxGrid, Checkbox} from 'rsuite';
import {ReactSortable} from 'react-sortablejs';
import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      examples={['default', 'size', 'bordered', 'hover', 'sortable', 'collection', 'custom', 'transfer']}
      dependencies={{List, Tag, Button, Icon, IconButton, FlexboxGrid, Checkbox, ReactSortable}}
    />
  );
}
