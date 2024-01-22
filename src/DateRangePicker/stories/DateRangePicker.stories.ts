import type { Meta, StoryObj } from '@storybook/react';
import DateRangePicker from '../DateRangePicker';
import '../styles/index.less';

const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    appearance: {
      control: {
        type: 'select'
      },
      options: ['default', 'subtle']
    },
    size: {
      control: {
        type: 'select'
      },
      options: ['xs', 'sm', 'md', 'lg']
    },
    format: {
      control: {
        type: 'text'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    },
    readOnly: {
      control: {
        type: 'boolean'
      }
    },
    plaintext: {
      control: {
        type: 'boolean'
      }
    },
    placement: {
      control: {
        type: 'select'
      },
      options: [
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom',
        'auto',
        'autoVerticalStart',
        'autoVerticalEnd',
        'autoHorizontalStart',
        'autoHorizontalEnd'
      ]
    },
    open: {
      control: {
        type: 'boolean'
      }
    },
    loading: {
      control: {
        type: 'boolean'
      }
    },
    block: {
      control: {
        type: 'boolean'
      }
    },
    isoWeek: {
      control: {
        type: 'boolean'
      }
    }
  }
} as Meta<typeof DateRangePicker>;

export default meta;

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
