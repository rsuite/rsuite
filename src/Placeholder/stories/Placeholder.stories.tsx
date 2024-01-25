import React from 'react';
import type { StoryObj } from '@storybook/react';
import Placeholder from '../';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Placeholder);

export default {
  title: 'Components/Placeholder',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  active: true
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const ParagraphCircle: Story = {
  args: {
    ...defaultArgs,
    graph: 'circle'
  }
};

export const ParagraphImage: Story = {
  args: {
    ...defaultArgs,
    graph: 'image'
  }
};

export const ParagraphSquare: Story = {
  args: {
    ...defaultArgs,
    graph: 'square'
  }
};

export const Grid: Story = {
  render: props => <Placeholder.Grid {...props} />,
  args: {
    ...defaultArgs,
    rows: 5,
    columns: 6
  }
};

export const Graph: Story = {
  render: props => <Placeholder.Graph {...props} />,
  args: {
    ...defaultArgs,
    width: 200,
    height: 200
  }
};
