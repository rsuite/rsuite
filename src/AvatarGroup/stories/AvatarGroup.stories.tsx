import React from 'react';
import type { StoryObj } from '@storybook/react';
import { createMeta } from '@/storybook/utils';

import Avatar from '../../Avatar';
import AvatarGroup from '../AvatarGroup';
import '../styles/index.less';
import '../../Avatar/styles/index.less';

const meta = createMeta(AvatarGroup);

export default {
  title: 'Components/AvatarGroup',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: [
    <Avatar key="1" circle src="https://avatars.githubusercontent.com/u/6412038" />,
    <Avatar key="2" circle src="https://avatars.githubusercontent.com/u/6128107" />,
    <Avatar key="3" circle src="https://avatars.githubusercontent.com/u/139426" />
  ]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Spacing: Story = {
  args: {
    ...defaultArgs,
    spacing: 10
  }
};

export const Stack: Story = {
  args: {
    ...defaultArgs,
    children: [
      ...defaultArgs.children,
      <Avatar key="4" circle>
        +
      </Avatar>
    ],
    stack: true
  }
};
