import * as React from 'react';
import { Whisper, Tooltip, ButtonToolbar, Button } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';

export default function Page() {
  return (
    <DefaultPage
      examples={['basic', 'placement', 'trigger', 'container', 'disabled-elements']}
      dependencies={{ PreventOverflowContainer, Whisper, Tooltip, ButtonToolbar, Button }}
    />
  );
}
