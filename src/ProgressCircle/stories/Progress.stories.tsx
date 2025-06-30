import React from 'react';
import type { StoryObj } from '@storybook/react';
import ProgressCircle from '../ProgressCircle';
import { HStack, VStack } from '../../Stack';

import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(ProgressCircle);

export default {
  ...meta,
  title: 'Components/ProgressCircle'
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  percent: 50,
  w: 100
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Status: Story = {
  render: props => (
    <HStack spacing={20}>
      <ProgressCircle percent={30} status="success" {...props} />
      <ProgressCircle percent={50} status="active" {...props} />
      <ProgressCircle percent={70} status="fail" {...props} />
    </HStack>
  ),
  args: {
    ...defaultArgs
  }
};

export const StrokeColor: Story = {
  render: props => (
    <HStack spacing={20}>
      <ProgressCircle percent={30} strokeColor="#ffc107" {...props} />
      <ProgressCircle percent={50} strokeColor="#3498ff" {...props} />
      <ProgressCircle percent={70} strokeColor="#ff4d4f" {...props} />
    </HStack>
  ),
  args: {
    ...defaultArgs
  }
};

export const StrokeWidth: Story = {
  render: props => (
    <HStack spacing={20}>
      <ProgressCircle percent={30} strokeWidth={4} {...props} />
      <ProgressCircle percent={50} strokeWidth={8} {...props} />
      <ProgressCircle percent={70} strokeWidth={12} {...props} />
    </HStack>
  ),
  args: {
    ...defaultArgs
  }
};

export const Gap: Story = {
  render: props => (
    <VStack spacing={20} alignItems="flex-start">
      <HStack spacing={20}>
        <ProgressCircle
          percent={30}
          gapDegree={90}
          gapPosition="top"
          renderInfo={() => 'Top'}
          {...props}
        />
        <ProgressCircle
          percent={30}
          gapDegree={90}
          gapPosition="right"
          renderInfo={() => 'Right'}
          {...props}
        />
        <ProgressCircle
          percent={30}
          gapDegree={90}
          gapPosition="bottom"
          renderInfo={() => 'Bottom'}
          {...props}
        />
        <ProgressCircle
          percent={30}
          gapDegree={90}
          gapPosition="left"
          renderInfo={() => 'Left'}
          {...props}
        />
      </HStack>
      <HStack spacing={20}>
        <ProgressCircle percent={30} gapDegree={0} renderInfo={() => '0'} {...props} />
        <ProgressCircle percent={30} gapDegree={90} renderInfo={() => '90'} {...props} />
        <ProgressCircle percent={30} gapDegree={180} renderInfo={() => '180'} {...props} />
        <ProgressCircle percent={30} gapDegree={270} renderInfo={() => '270'} {...props} />
      </HStack>
    </VStack>
  ),
  args: {
    ...defaultArgs
  }
};

export const StrokeLinecap: Story = {
  render: props => (
    <HStack spacing={20}>
      <ProgressCircle percent={30} strokeLinecap="round" renderInfo={() => 'round'} {...props} />
      <ProgressCircle percent={30} strokeLinecap="square" renderInfo={() => 'square'} {...props} />
      <ProgressCircle percent={30} strokeLinecap="butt" renderInfo={() => 'butt'} {...props} />
    </HStack>
  ),
  args: {
    ...defaultArgs
  }
};

export const ShowInfo: Story = {
  render: props => (
    <HStack spacing={20}>
      <ProgressCircle percent={30} showInfo {...props} />
      <ProgressCircle percent={30} showInfo={false} {...props} />
    </HStack>
  ),
  args: {
    ...defaultArgs
  }
};

export const RenderInfo: Story = {
  render: props => (
    <HStack spacing={20}>
      <ProgressCircle percent={30} renderInfo={() => `Usage`} {...props} />

      <ProgressCircle
        percent={60}
        {...props}
        renderInfo={percent => (
          <VStack align="center">
            <p>Usage</p>

            <p>{percent}%</p>
          </VStack>
        )}
      />
    </HStack>
  ),
  args: {
    ...defaultArgs
  }
};
