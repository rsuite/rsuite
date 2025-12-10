import type { StoryObj } from '@storybook/react';
import TimePicker from '../TimePicker';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(TimePicker);

export default {
  title: 'Components/TimePicker',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: { width: 260 }
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const WithMeridiem: Story = {
  args: {
    ...defaultArgs,
    showMeridiem: true
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};

export const Readonly: Story = {
  args: {
    ...defaultArgs,
    readOnly: true
  }
};

export const Plaintext: Story = {
  args: {
    ...defaultArgs,
    plaintext: true,
    defaultValue: new Date()
  }
};

export const WithLabel: Story = {
  args: {
    ...defaultArgs,
    label: 'Time',
    placeholder: 'Select time'
  }
};

export const CustomFormat: Story = {
  args: {
    ...defaultArgs,
    format: 'HH:mm',
    placeholder: 'HH:mm format'
  }
};

export const Loading: Story = {
  args: {
    ...defaultArgs,
    loading: true
  }
};
