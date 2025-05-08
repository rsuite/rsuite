import React from 'react';
import type { StoryObj } from '@storybook/react';
import ProgressCircle from '../ProgressCircle';
import Stack from '../../Stack';

import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(ProgressCircle);

export default {
  ...meta,
  title: 'Components/ProgressCircle'
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  percent: 50
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Status: Story = {
  render: props => (
    <>
      <ProgressCircle percent={30} strokeColor="#ffc107" />
      <ProgressCircle percent={30} status="success" {...props} />
      <ProgressCircle percent={50} status="active" {...props} />
      <ProgressCircle percent={70} status="fail" {...props} />
      <ProgressCircle percent={80} showInfo={false} />
    </>
  ),
  args: {
    ...defaultArgs
  }
};

export const Vertical: Story = {
  render: props => (
    <Stack>
      <ProgressCircle percent={30} strokeColor="#ffc107" {...props} />
      <ProgressCircle percent={30} status="success" {...props} />
      <ProgressCircle percent={50} status="active" {...props} />
      <ProgressCircle percent={70} status="fail" {...props} />
      <ProgressCircle percent={80} showInfo={false} {...props} />
    </Stack>
  ),
  args: {
    ...defaultArgs,
    style: { height: 300 },
    vertical: true
  }
};
