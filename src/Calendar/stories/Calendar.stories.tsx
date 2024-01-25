import type { StoryObj } from '@storybook/react';
import Calendar from '../Calendar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Calendar);

export default {
  title: 'Components/Calendar',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Bordered: Story = {
  args: {
    ...defaultArgs,
    bordered: true
  }
};

export const Compact: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    compact: true,
    style: {
      width: 300
    }
  }
};
