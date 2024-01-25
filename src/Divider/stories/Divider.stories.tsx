import React from 'react';
import type { StoryObj } from '@storybook/react';
import Divider, { DividerProps } from '../Divider';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Divider);

export default {
  title: 'Components/Divider',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const WithText: Story = {
  args: {
    ...defaultArgs,
    children: 'Text'
  }
};

const VerticalTemplate = (props: DividerProps) => {
  return (
    <>
      <a>Edit</a>
      <Divider {...props} as="div" />
      <a>Update</a>
      <Divider {...props} as="div" />
      <a>Save</a>
    </>
  );
};

export const Vertical: Story = {
  render: VerticalTemplate,
  args: {
    ...defaultArgs,
    vertical: true
  }
};
