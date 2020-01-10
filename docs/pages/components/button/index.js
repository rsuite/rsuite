import React from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar, Panel, Icon } from 'rsuite';
import * as SvgIcons from '@/components/SvgIcons';

import createComponentExample from '@/utils/createComponentExample';

export default createComponentExample({
  id: 'Button',
  examples: [
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
  ],
  dependencies: {
    SvgIcons,
    Button,
    IconButton,
    ButtonGroup,
    ButtonToolbar,
    Icon,
    Panel
  }
});
