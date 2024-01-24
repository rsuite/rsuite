import React from 'react';
import type { StoryObj } from '@storybook/react';
import ButtonGroup from '../ButtonGroup';
import Button from '../..//Button';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(ButtonGroup);

export default {
  title: 'Components/ButtonGroup',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: [
    <Button key="1">Left</Button>,
    <Button key="2">Middle</Button>,
    <Button key="3">Right</Button>
  ]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Size: Story = {
  args: {
    ...defaultArgs,
    size: 'lg'
  }
};

export const Vertical: Story = {
  args: {
    ...defaultArgs,
    vertical: true
  }
};

export const Block: Story = {
  args: {
    ...defaultArgs,
    block: true
  }
};

export const Justified: Story = {
  args: {
    ...defaultArgs,
    justified: true
  }
};
