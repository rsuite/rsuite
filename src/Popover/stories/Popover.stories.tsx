import React from 'react';
import type { StoryObj } from '@storybook/react';
import Popover from '../Popover';
import Whisper from '../..//Whisper';
import Stack from '../..//Stack';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Stack/styles/index.less';

const meta = createMeta(Popover);

export default {
  ...meta,
  title: 'Components/Popover',
  parameters: {
    layout: 'centered'
  }
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  title: 'Popover Title',
  children: 'Popover Content'
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    visible: true
  }
};

export const Placement: Story = {
  render: props => (
    <Stack spacing={20}>
      <Whisper placement="right" trigger="hover" speaker={<Popover {...props} />}>
        <button>Right </button>
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={<Popover {...props} />}>
        <button>Top </button>
      </Whisper>
      <Whisper placement="bottom" trigger="hover" speaker={<Popover {...props} />}>
        <button>Bottom </button>
      </Whisper>
      <Whisper placement="left" trigger="hover" speaker={<Popover {...props} />}>
        <button>Left </button>
      </Whisper>
    </Stack>
  ),
  args: {
    ...defaultArgs
  }
};

export const Trigger: Story = {
  render: props => (
    <Stack spacing={20}>
      <Whisper placement="top" trigger="click" speaker={<Popover {...props} />}>
        <button>Click</button>
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={<Popover {...props} />}>
        <button>Hover</button>
      </Whisper>
      <Whisper placement="top" trigger="focus" speaker={<Popover {...props} />}>
        <button>Focus</button>
      </Whisper>
      <Whisper placement="top" trigger="contextMenu" speaker={<Popover {...props} />}>
        <button>ContextMenu</button>
      </Whisper>
      <Whisper placement="top" trigger="active" speaker={<Popover {...props} />}>
        <button>Active</button>
      </Whisper>
    </Stack>
  ),
  args: {
    ...defaultArgs
  }
};

export const HideRrrowIndicator: Story = {
  render: props => (
    <Whisper placement="top" trigger="hover" speaker={<Popover {...props} />}>
      <button>Hover Me</button>
    </Whisper>
  ),
  args: {
    ...defaultArgs,
    arrow: false
  }
};

export const FollowCursor: Story = {
  render: props => (
    <Whisper followCursor placement="top" trigger="hover" speaker={<Popover {...props} />}>
      <button>Hover Me</button>
    </Whisper>
  ),
  args: {
    ...defaultArgs
  }
};
