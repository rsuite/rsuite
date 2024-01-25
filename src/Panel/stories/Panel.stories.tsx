import React from 'react';
import type { StoryObj } from '@storybook/react';
import Panel from '../';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Panel);

export default {
  title: 'Components/Panel',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  header: 'Panel Header',
  children: (
    <>
      <p>Panel Content</p>
      <p>Panel Content</p>
      <p>Panel Content</p>
    </>
  )
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

export const Shadow: Story = {
  args: {
    ...defaultArgs,
    shaded: true
  }
};

export const Collapsible: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    collapsible: true
  }
};
