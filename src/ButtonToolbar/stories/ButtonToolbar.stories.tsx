import React from 'react';
import type { StoryObj } from '@storybook/react';
import ButtonToolbar from '../ButtonToolbar';
import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../ButtonGroup/styles/index.scss';

const meta = createMeta(ButtonToolbar);

export default {
  title: 'Components/ButtonToolbar',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: [
    <Button key="1">Left</Button>,
    <Button key="2">Middle</Button>,
    <Button key="3">Right</Button>
  ]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const WithButtonGroups: Story = {
  args: {
    children: [
      <ButtonGroup key="1">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>,
      <ButtonGroup key="2">
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </ButtonGroup>
    ]
  }
};

export const MixedButtons: Story = {
  args: {
    children: [
      <Button key="1" appearance="primary">
        Primary
      </Button>,
      <Button key="2" appearance="default">
        Default
      </Button>,
      <Button key="3" appearance="subtle">
        Subtle
      </Button>,
      <Button key="4" appearance="link">
        Link
      </Button>
    ]
  }
};
