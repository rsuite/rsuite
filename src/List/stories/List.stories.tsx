import React from 'react';
import type { StoryObj } from '@storybook/react';
import List from '../List';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(List);

export default {
  title: 'Components/List',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: [
    <List.Item key="1">Roses are red</List.Item>,
    <List.Item key="2">Violets are blue</List.Item>,
    <List.Item key="3">Sugar is sweet</List.Item>,
    <List.Item key="4">And so are you</List.Item>
  ]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Bordered: Story = {
  args: {
    ...defaultArgs,
    bordered: true
  }
};

export const Hoverable: Story = {
  args: {
    ...defaultArgs,
    hover: true
  }
};

export const Size: Story = {
  args: {
    ...defaultArgs,
    size: 'sm'
  }
};
