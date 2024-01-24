import React from 'react';
import type { StoryObj } from '@storybook/react';
import Loader from '../Loader';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Button/styles/index.less';

const meta = createMeta(Loader);

export default {
  title: 'Components/Loader',
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
    content: 'Loading...'
  }
};

export const Vertical: Story = {
  args: {
    ...defaultArgs,
    content: 'Loading...',
    vertical: true
  }
};

export const Size: Story = {
  args: {
    ...defaultArgs,
    content: 'Loading...',
    size: 'lg'
  }
};

export const Speed: Story = {
  args: {
    ...defaultArgs,
    content: 'Loading...',
    speed: 'slow'
  }
};

export const Center: Story = {
  render: props => (
    <div style={{ width: 500, height: 200, position: 'relative', background: '#f5f5f5' }}>
      This is a center loader
      <Loader {...props} />
    </div>
  ),
  args: {
    ...defaultArgs,
    content: 'Loading...',
    center: true
  }
};

export const Backdrop: Story = {
  render: props => (
    <div style={{ width: 500, height: 200, position: 'relative', background: '#f5f5f5' }}>
      This is a backdrop
      <Loader {...props} />
    </div>
  ),
  args: {
    ...defaultArgs,
    content: 'Loading...',
    backdrop: true
  }
};

export const Inverse: Story = {
  render: props => (
    <div style={{ width: 500, height: 200, position: 'relative', background: '#000' }}>
      This is a inverse loader
      <Loader {...props} />
    </div>
  ),
  args: {
    ...defaultArgs,
    content: 'Loading...',
    center: true,
    inverse: true
  }
};
