import React from 'react';
import type { StoryObj } from '@storybook/react';
import PinInput from '../PinInput';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../Input/styles/index.scss';
import '../../Stack/styles/index.scss';

const meta = createMeta(PinInput);

export default {
  title: 'Components/PinInput',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  length: 4,
  style: { width: 260 }
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Masked: Story = {
  args: {
    ...defaultArgs,
    mask: true
  }
};

export const Alphabetic: Story = {
  args: {
    ...defaultArgs,
    type: 'alphabetic',
    length: 6,
    placeholder: 'A'
  }
};

export const OTPMode: Story = {
  args: {
    ...defaultArgs,
    otp: true,
    placeholder: '•'
  }
};

export const Attached: Story = {
  args: {
    ...defaultArgs,
    attached: true
  }
};

export const WithCompleteHandler: Story = {
  render: props => {
    const [value, setValue] = React.useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PinInput
          {...props}
          value={value}
          onChange={setValue}
          onComplete={val => {
            // eslint-disable-next-line no-console
            console.log('Completed PIN:', val);
          }}
        />
        <div>Current value: {value}</div>
      </div>
    );
  },
  args: {
    ...defaultArgs
  }
};
