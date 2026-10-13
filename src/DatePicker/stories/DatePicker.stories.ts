import type { StoryObj } from '@storybook/react';
import DatePicker from '../DatePicker';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(DatePicker);

export default {
  title: 'Components/DatePicker',
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

export const DateTimePicker: Story = {
  args: {
    ...defaultArgs,
    format: 'yyyy-MM-dd HH:mm:ss'
  }
};

export const TimePicker: Story = {
  args: {
    ...defaultArgs,
    format: 'HH:mm:ss'
  }
};

export const MonthPicker: Story = {
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

export const IndependentOpening: Story = {
  args: {
    ...defaultArgs,
    openOnInputClick: false,
    defaultValue: new Date(2024, 1, 12)
  },
  parameters: {
    docs: {
      description: {
        story:
          'Edit the input without opening the popup. Use the calendar button to open it; Escape returns focus to the button. The clear button remains available alongside it.'
      }
    }
  }
};
