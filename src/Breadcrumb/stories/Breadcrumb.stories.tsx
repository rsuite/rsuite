import React from 'react';
import type { StoryObj } from '@storybook/react';
import Breadcrumb from '../Breadcrumb';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Breadcrumb);

export default {
  title: 'Components/Breadcrumb',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: [
    <Breadcrumb.Item key="1">Home</Breadcrumb.Item>,
    <Breadcrumb.Item key="2">Components</Breadcrumb.Item>,
    <Breadcrumb.Item key="3">Breadcrumb</Breadcrumb.Item>
  ]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const CustomSeparator: Story = {
  args: {
    ...defaultArgs,
    separator: '>'
  }
};

export const WithExpand: Story = {
  args: {
    children: [
      <Breadcrumb.Item key={1}>Item A</Breadcrumb.Item>,
      <Breadcrumb.Item key={2}>Item B</Breadcrumb.Item>,
      <Breadcrumb.Item key={3}>Item C</Breadcrumb.Item>,
      <Breadcrumb.Item key={4}>Item D</Breadcrumb.Item>,
      <Breadcrumb.Item key={5}>Item E</Breadcrumb.Item>,
      <Breadcrumb.Item key={6}>Item F</Breadcrumb.Item>
    ],
    maxItems: 5
  }
};
