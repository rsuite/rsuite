import React from 'react';
import type { StoryObj } from '@storybook/react';
import Carousel from '../Carousel';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Carousel);

export default {
  title: 'Components/Carousel',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: {
    width: 600,
    height: 250
  },
  children: [
    <img key="1" src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1" height="250" />,
    <img key="2" src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2" height="250" />,
    <img key="3" src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3" height="250" />,
    <img key="4" src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4" height="250" />,
    <img key="5" src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5" height="250" />
  ]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const ShapeBar: Story = {
  args: {
    ...defaultArgs,
    shape: 'bar'
  }
};

export const PlacementRight: Story = {
  args: {
    ...defaultArgs,
    placement: 'right'
  }
};
