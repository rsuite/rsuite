import React from 'react';
import type { StoryObj } from '@storybook/react';
import FlexboxGrid from '../FlexboxGrid';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import './styles.less';

const meta = createMeta(FlexboxGrid);

export default {
  title: 'Components/FlexboxGrid',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  className: 'show-grid',
  children: (
    <>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
    </>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <FlexboxGrid.Item colspan={6}>colspan={6}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>colspan={6}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>colspan={6}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>colspan={6}</FlexboxGrid.Item>
      </>
    )
  }
};

export const Justify: Story = {
  args: {
    ...defaultArgs,
    justify: 'start'
  }
};

export const Alignment: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <FlexboxGrid.Item colspan={6}>
          <div style={{ lineHeight: 1 }}>colspan={6}</div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>
          <div style={{ lineHeight: 2 }}>colspan={6}</div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>
          <div style={{ lineHeight: 3 }}>colspan={6}</div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>
          <div style={{ lineHeight: 4 }}>colspan={6}</div>
        </FlexboxGrid.Item>
      </>
    ),
    align: 'middle'
  }
};

export const Order: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <FlexboxGrid.Item colspan={4} order={4}>
          Item 1
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4} order={3}>
          Item 2
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4} order={2}>
          Item 3
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4} order={1}>
          Item 4
        </FlexboxGrid.Item>
      </>
    )
  }
};
