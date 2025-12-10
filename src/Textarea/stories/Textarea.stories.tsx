import React from 'react';
import type { StoryObj } from '@storybook/react';
import Textarea from '../Textarea';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(Textarea);

export default {
  title: 'Components/Textarea',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  placeholder: 'Enter your text...',
  style: { width: 320 }
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Rows: Story = {
  args: {
    ...defaultArgs,
    rows: 5,
    placeholder: 'Textarea with 5 rows'
  }
};

export const Sizes: Story = {
  render: props => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Textarea {...props} size="sm" placeholder="Small" />
      <Textarea {...props} size="md" placeholder="Medium (default)" />
      <Textarea {...props} size="lg" placeholder="Large" />
    </div>
  ),
  args: {
    ...defaultArgs
  }
};

export const Autosize: Story = {
  args: {
    ...defaultArgs,
    autosize: true,
    minRows: 2,
    maxRows: 6,
    placeholder: 'Autosize between 2 and 6 rows. Type more lines to see the effect.'
  }
};

export const ResizeControl: Story = {
  args: {
    ...defaultArgs,
    resize: 'vertical',
    rows: 3,
    placeholder: 'Resize vertically only'
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
    defaultValue: 'Disabled textarea'
  }
};

export const Readonly: Story = {
  args: {
    ...defaultArgs,
    readOnly: true,
    defaultValue: 'Readonly textarea'
  }
};
