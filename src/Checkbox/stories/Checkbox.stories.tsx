import type { StoryObj } from '@storybook/react';
import Checkbox from '../Checkbox';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Checkbox);

export default {
  title: 'Components/Checkbox',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const WithChildren: Story = {
  args: {
    ...defaultArgs,
    children: 'Checkbox'
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    children: 'Checkbox',
    disabled: true
  }
};

export const ReadOnly: Story = {
  args: {
    ...defaultArgs,
    children: 'Checkbox',
    readOnly: true
  }
};

export const Indeterminate: Story = {
  args: {
    ...defaultArgs,
    children: 'Checkbox',
    indeterminate: true
  }
};
