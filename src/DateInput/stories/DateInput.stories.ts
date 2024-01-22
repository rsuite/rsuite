import type { Meta, StoryObj } from '@storybook/react';
import DateInput from '../DateInput';
import '../styles/index.less';

const meta = {
  title: 'Components/DateInput',
  component: DateInput,
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
    }
  }
} as Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs: Story['args'] = {
  format: 'yyyy-MM-dd'
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};
