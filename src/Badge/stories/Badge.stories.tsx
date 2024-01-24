import type { StoryObj } from '@storybook/react';
import Badge from '../Badge';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Badge);

export default {
  title: 'Components/Badge',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Color: Story = {
  args: {
    ...defaultArgs,
    color: 'red'
  }
};

export const MaxCount: Story = {
  args: {
    ...defaultArgs,
    content: 10000,
    maxCount: 99
  }
};

export const Content: Story = {
  args: {
    ...defaultArgs,
    content: 'New'
  }
};

export const WithChildren: Story = {
  args: {
    ...defaultArgs,
    content: 10000,
    maxCount: 99,
    children: 'Inbox'
  }
};
