import type { StoryObj } from '@storybook/react';
import InputNumber from '../InputNumber';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(InputNumber);

export default {
  title: 'Components/InputNumber',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: { width: 200 }
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};

export const Readnly: Story = {
  args: {
    ...defaultArgs,
    readOnly: true
  }
};

export const Plaintext: Story = {
  args: {
    ...defaultArgs,
    plaintext: true
  }
};

export const Size: Story = {
  args: {
    ...defaultArgs,
    size: 'lg'
  }
};

export const Step: Story = {
  args: {
    ...defaultArgs,
    step: 0.1
  }
};

export const MinMax: Story = {
  args: {
    ...defaultArgs,
    min: 0,
    max: 10
  }
};
