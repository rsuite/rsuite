import React from 'react';
import { Message, Button, ButtonToolbar } from 'rsuite';
import createComponentExample from '@/utils/createComponentExample';

export default createComponentExample({
  id: 'Message',
  examples: ['basic', 'types', 'description', 'icons', 'close', 'full'],
  dependencies: {
    ButtonToolbar,
    Button,
    Message
  }
});
