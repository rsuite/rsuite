import type { StoryObj } from '@storybook/react';
import RangeSlider from '../RangeSlider';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(RangeSlider);

export default {
  title: 'Components/RangeSlider',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: {
    marginTop: 100
  },
  defaultValue: [10, 50] as [number, number]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Graduated: Story = {
  args: {
    ...defaultArgs,
    step: 10,
    graduated: true
  }
};

export const Vertical: Story = {
  args: {
    ...defaultArgs,
    style: {
      marginTop: 0,
      height: 300
    },
    vertical: true
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};

export const ReadOnly: Story = {
  args: {
    ...defaultArgs,
    readOnly: true
  }
};
