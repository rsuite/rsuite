import type { StoryObj } from '@/storybook/types';
import DateRangePicker from '../DateRangePicker';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

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

export const OneTap: Story = {
  args: {
    ...defaultArgs,
    oneTap: true
  }
};

export const WithRanges: Story = {
  args: {
    ...defaultArgs,
    ranges: [
      {
        label: 'Today',
        value: [new Date(), new Date()]
      },
      {
        label: 'Last 7 days',
        value: [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()]
      }
    ]
  }
};

export const IndependentOpening: Story = {
  args: {
    ...defaultArgs,
    openOnInputClick: false,
    defaultValue: [new Date(2024, 1, 12), new Date(2024, 1, 16)]
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
