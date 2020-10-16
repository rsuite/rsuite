import React from 'react';
import { List, Tag, Button, Icon, FlexboxGrid, Panel } from 'rsuite';
import DefaultPage from '@/components/Page';

export default function Page() {
  return <DefaultPage dependencies={{ Panel, List, Tag, Button, Icon, FlexboxGrid }} />;
}
