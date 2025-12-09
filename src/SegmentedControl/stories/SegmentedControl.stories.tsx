import React from 'react';
import type { StoryObj } from '@storybook/react';
import SegmentedControl from '../SegmentedControl';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(SegmentedControl);

export default {
  title: 'Components/SegmentedControl',
  ...meta
};

type Story = StoryObj<typeof meta>;

const basicData = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' }
];

const defaultArgs = {
  data: basicData
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 'daily'
  }
};

export const Sizes: Story = {
  render: props => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SegmentedControl {...props} size="sm" defaultValue="daily" />
      <SegmentedControl {...props} size="md" defaultValue="weekly" />
      <SegmentedControl {...props} size="lg" defaultValue="monthly" />
    </div>
  ),
  args: {
    ...defaultArgs
  }
};

export const Block: Story = {
  args: {
    ...defaultArgs,
    block: true,
    defaultValue: 'weekly',
    style: { maxWidth: 400 }
  }
};

export const IndicatorVariants: Story = {
  render: props => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SegmentedControl {...props} indicator="pill" defaultValue="daily" />
      <SegmentedControl {...props} indicator="underline" defaultValue="daily" />
    </div>
  ),
  args: {
    ...defaultArgs
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
    defaultValue: 'daily'
  }
};

export const Controlled: Story = {
  render: props => {
    const [value, setValue] = React.useState<string | number | null>('daily');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SegmentedControl {...props} value={value ?? undefined} onChange={next => setValue(next)} />
        <div>Current value: {String(value)}</div>
      </div>
    );
  },
  args: {
    ...defaultArgs,
    name: 'segmented-controlled'
  }
};
