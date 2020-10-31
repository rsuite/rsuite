import React from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar, Panel, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';
import * as SvgIcons from '@/components/SvgIcons';

export default function Page() {
  
  return (
    <DefaultPage
      dependencies={{
        Button,
        IconButton,
        ButtonGroup,
        ButtonToolbar,
        Icon,
        Panel,
        SvgIcons
      }}
    />
  );
}

