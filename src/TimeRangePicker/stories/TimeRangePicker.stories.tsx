import type { StoryObj } from '@storybook/react';
import TimeRangePicker from '../TimeRangePicker';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(TimeRangePicker);

export default {
  title: 'Components/TimeRangePicker',
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
    defaultValue: [new Date(), new Date()] as any
  }
};

export const WithCharacter: Story = {
  args: {
    ...defaultArgs,
    character: ' to '
  }
};

export const NoHeader: Story = {
  args: {
    ...defaultArgs,
    showHeader: false
  }
};

export const CustomFormat: Story = {
  args: {
    ...defaultArgs,
    format: 'HH:mm',
    placeholder: 'Select time range'
  }
};
