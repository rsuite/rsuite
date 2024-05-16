import React from 'react';
import type { StoryObj, Meta } from '@storybook/react';
import Highlight from '../Highlight';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Highlight) as Meta<typeof Highlight>;

export default {
  title: 'Components/Highlight',
  ...meta
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    query: 'React',
    children:
      'React Suite is a set of react components that have high quality and high performance.'
  }
};

export const MultipleWords: Story = {
  args: {
    query: ['high quality', 'high performance'],
    children:
      'React Suite is a set of react components that have high quality and high performance.'
  }
};

export const CustomMark: Story = {
  args: {
    query: ['high quality', 'high performance'],
    children:
      'React Suite is a set of react components that have high quality and high performance.',
    renderMark: (match, index) => (
      <mark key={index} style={{ backgroundColor: '#f4f4f4', color: '#f00' }}>
        {match}
      </mark>
    )
  }
};
