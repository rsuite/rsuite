import type { StoryObj } from '@storybook/react';
import Avatar from '../Avatar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Avatar);

export default {
  title: 'Components/Avatar',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  circle: false
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    src: 'https://avatars.githubusercontent.com/u/6412038'
  }
};

export const CircleAvatar: Story = {
  args: {
    ...defaultArgs,
    src: 'https://avatars.githubusercontent.com/u/6412038',
    circle: true
  }
};

export const CharacterAvatar: Story = {
  args: {
    ...defaultArgs,
    children: 'R'
  }
};
