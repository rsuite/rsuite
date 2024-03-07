import React from 'react';
import type { StoryObj } from '@storybook/react';
import InlineEdit from '../InlineEdit';
import Input from '../../Input';
import DatePicker from '../../DatePicker';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(InlineEdit);

export default {
  title: 'Components/InlineEdit',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultProps = {
  defaultValue: 'Edit me'
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    ...defaultProps
  }
};

export const Disabled: Story = {
  args: {
    ...defaultProps,
    disabled: true
  }
};

export const TextArea: Story = {
  args: {
    ...defaultProps,
    children: <Input as="textarea" rows={5} />
  }
};

export const WithDatePicker: Story = {
  args: {
    ...defaultProps,
    defaultValue: new Date(),
    children: <DatePicker format="MMMM dd, yyyy" />
  }
};

export const HideControls: Story = {
  args: {
    ...defaultProps,
    showControls: false
  }
};
