import type { StoryObj } from '@storybook/react';
import DateRangePicker from '../DateRangePicker';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(DateRangePicker);

export default {
  title: 'Components/DateRangePicker',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs: Story['args'] = {
  appearance: 'default',
  format: 'yyyy-MM-dd'
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Subtle: Story = {
  args: {
    ...defaultArgs,
    appearance: 'subtle'
  }
};

export const CustomizeTheDateFormat: Story = {
  args: {
    ...defaultArgs
  }
};

export const DateTimeRangePicker: Story = {
  args: {
    ...defaultArgs,
    format: 'yyyy-MM-dd HH:mm:ss'
  }
};

export const TimeRangePicker: Story = {
  args: {
    ...defaultArgs,
    format: 'HH:mm:ss'
  }
};

export const MonthRangePicker: Story = {
  args: {
    ...defaultArgs,
    format: 'yyyy-MM'
  }
};

export const isoWeek: Story = {
  args: {
    ...defaultArgs,
    isoWeek: true
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};

export const HideHeader: Story = {
  args: {
    ...defaultArgs,
    showHeader: false
  }
};
