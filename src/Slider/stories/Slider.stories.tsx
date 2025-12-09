import React from 'react';
import type { StoryObj } from '@storybook/react';
import Slider from '../Slider';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(Slider);

export default {
  title: 'Components/Slider',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  min: 0,
  max: 100,
  step: 1,
  style: { width: 260 }
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 40
  }
};

export const Graduated: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 50,
    step: 10,
    graduated: true
  }
};

export const Vertical: Story = {
  args: {
    ...defaultArgs,
    style: { height: 200, marginTop: 40 },
    defaultValue: 30,
    vertical: true
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 60,
    disabled: true
  }
};

export const Readonly: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 30,
    readOnly: true
  }
};

export const WithMarks: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 25,
    step: 25,
    graduated: true,
    marks: [
      { value: 0, label: '0%' },
      { value: 25, label: '25%' },
      { value: 50, label: '50%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' }
    ]
  }
};

export const CustomTooltip: Story = {
  args: {
    ...defaultArgs,
    defaultValue: 70,
    keepTooltipOpen: true,
    renderTooltip: value => <span>{value}%</span>
  }
};
