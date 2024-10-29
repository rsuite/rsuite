import React from 'react';
import type { StoryObj } from '@storybook/react';
import HeartIcon from '@rsuite/icons/Heart';
import Rate, { RateProps } from '../Rate';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Rate);

export default {
  ...meta,
  title: 'Components/Rate'
};

type Story = StoryObj<typeof meta>;

const defaultArgs: RateProps = {
  defaultValue: 3,
  color: 'yellow'
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

export const Color: Story = {
  args: {
    ...defaultArgs,
    color: 'red'
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    children: 'Rate',
    disabled: true
  }
};

export const HalfRatings: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 2.5,
    allowHalf: true
  }
};

export const VerticalDirection: Story = {
  args: {
    ...defaultArgs,
    vertical: true
  }
};

export const Characters: Story = {
  args: {
    ...defaultArgs,
    color: 'red',
    character: <HeartIcon />
  }
};
