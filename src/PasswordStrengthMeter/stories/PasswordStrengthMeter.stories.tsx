import React from 'react';
import type { StoryObj } from '@storybook/react';
import PasswordStrengthMeter from '../PasswordStrengthMeter';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../Text/styles/index.scss';

const meta = createMeta(PasswordStrengthMeter);

export default {
  title: 'Components/PasswordStrengthMeter',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  level: 1,
  max: 4
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    label: 'Weak password'
  }
};

export const Levels: Story = {
  render: props => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 260 }}>
      <PasswordStrengthMeter {...props} level={0} label="Very weak" />
      <PasswordStrengthMeter {...props} level={1} label="Weak" />
      <PasswordStrengthMeter {...props} level={2} label="Medium" />
      <PasswordStrengthMeter {...props} level={3} label="Strong" />
    </div>
  ),
  args: {
    ...defaultArgs
  }
};

export const CustomMaxSegments: Story = {
  args: {
    ...defaultArgs,
    max: 6,
    level: 4,
    label: 'Custom 6 segments'
  }
};
