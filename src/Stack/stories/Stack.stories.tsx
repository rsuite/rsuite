import React from 'react';
import type { StoryObj } from '@storybook/react';
import Stack, { StackProps } from '../Stack';
import Button from '../../Button';
import Divider from '../../Divider';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Divider/styles/index.less';
import '../../Button/styles/index.less';

const meta = createMeta(Stack);

export default {
  ...meta,
  title: 'Components/Stack'
};

type Story = StoryObj<typeof meta>;

const defaultArgs: StackProps = {
  spacing: 10,
  children: [
    <Button key="1">Button</Button>,
    <Button key="2">Button</Button>,
    <Button key="3">Button</Button>
  ]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Dividers: Story = {
  args: {
    ...defaultArgs,
    divider: <Divider vertical />
  }
};

export const Wrap: Story = {
  args: {
    ...defaultArgs,
    wrap: true,
    style: { width: 500 },
    children: [
      <Button key="1">Button</Button>,
      <Button key="2">Button</Button>,
      <Button key="3">Button</Button>,
      <Button key="4">Button</Button>,
      <Button key="5">Button</Button>,
      <Button key="6">Button</Button>,
      <Button key="7">Button</Button>,
      <Button key="8">Button</Button>,
      <Button key="9">Button</Button>,
      <Button key="10">Button</Button>
    ]
  }
};
