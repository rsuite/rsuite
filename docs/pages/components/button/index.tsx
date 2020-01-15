import * as React from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar, Panel, Icon } from 'rsuite';
import DefaultPage from '@/components/Page';
import * as SvgIcons from '@/components/SvgIcons';

export default function Page() {
  return (
    <DefaultPage
      examples={[
        'basic',
        'appearance',
        'size',
        'color',
        'custom',
        'icon-button',
        'block',
        'disabled',
        'active',
        'loading',
        'group-basic',
        'vertical',
        'toolbar',
        'justified'
      ]}
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
