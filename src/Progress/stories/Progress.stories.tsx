import React from 'react';
import type { StoryObj } from '@storybook/react';
import Progress from '../Progress';
import Stack from '../../Stack';

import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Progress);

export default {
  ...meta,
  title: 'Components/Progress'
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
      <Progress percent={30} strokeColor="#ffc107" />
      <Progress percent={30} status="success" {...props} />
      <Progress percent={50} status="active" {...props} />
      <Progress percent={70} status="fail" {...props} />
      <Progress percent={80} showInfo={false} />
    </>
  ),
  args: {
    ...defaultArgs
  }
};

export const Vertical: Story = {
  render: props => (
    <Stack>
      <Progress percent={30} strokeColor="#ffc107" {...props} />
      <Progress percent={30} status="success" {...props} />
      <Progress percent={50} status="active" {...props} />
      <Progress percent={70} status="fail" {...props} />
      <Progress percent={80} showInfo={false} {...props} />
    </Stack>
  ),
  args: {
    ...defaultArgs,
    style: { height: 300 },
    vertical: true
  }
};

const style = {
  width: 120,
  display: 'inline-block',
  marginRight: 10
};

export const Circle: Story = {
  render: props => (
    <>
      <div style={style}>
        <Progress.Circle {...props} />
      </div>
      <div style={style}>
        <Progress.Circle percent={30} strokeColor="#ffc107" {...props} />
      </div>
      <div style={style}>
        <Progress.Circle percent={100} status="success" {...props} />
      </div>
      <div style={style}>
        <Progress.Circle percent={30} status="fail" {...props} />
      </div>
      <div style={style}>
        <Progress.Circle percent={30} showInfo={false} {...props} />
      </div>
    </>
  ),
  args: {
    ...defaultArgs,
    type: 'circle'
  }
};
