import React from 'react';
import type { StoryObj } from '@storybook/react';
import Tooltip from '../Tooltip';
import Whisper from '../..//Whisper';
import Stack from '../..//Stack';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Stack/styles/index.less';

const meta = createMeta(Tooltip);

export default {
  ...meta,
  title: 'Components/Tooltip',
  parameters: {
    layout: 'centered'
  }
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Tooltip Content'
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
      <Whisper placement="right" trigger="hover" speaker={<Tooltip {...props} />}>
        <button>Right </button>
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={<Tooltip {...props} />}>
        <button>Top </button>
      </Whisper>
      <Whisper placement="bottom" trigger="hover" speaker={<Tooltip {...props} />}>
        <button>Bottom </button>
      </Whisper>
      <Whisper placement="left" trigger="hover" speaker={<Tooltip {...props} />}>
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
      <Whisper placement="top" trigger="click" speaker={<Tooltip {...props} />}>
        <button>Click</button>
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={<Tooltip {...props} />}>
        <button>Hover</button>
      </Whisper>
      <Whisper placement="top" trigger="focus" speaker={<Tooltip {...props} />}>
        <button>Focus</button>
      </Whisper>
      <Whisper placement="top" trigger="contextMenu" speaker={<Tooltip {...props} />}>
        <button>ContextMenu</button>
      </Whisper>
      <Whisper placement="top" trigger="active" speaker={<Tooltip {...props} />}>
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
    <Whisper placement="top" trigger="hover" speaker={<Tooltip {...props} />}>
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
    <Whisper followCursor placement="top" trigger="hover" speaker={<Tooltip {...props} />}>
      <button>Hover Me</button>
    </Whisper>
  ),
  args: {
    ...defaultArgs
  }
};
