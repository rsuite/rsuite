import type { StoryObj } from '@storybook/react';
import RadioTile from '../RadioTile';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(RadioTile);

export default {
  title: 'Components/RadioTile',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  label: 'RadioTile',
  children: 'RadioTile Content'
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Checked: Story = {
  args: {
    ...defaultArgs,
    checked: true
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    children: 'RadioTile',
    disabled: true
  }
};
