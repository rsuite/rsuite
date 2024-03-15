import React from 'react';
import type { StoryObj } from '@storybook/react';
import Checkbox, { CheckboxProps } from '../Checkbox';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Checkbox);

export default {
  title: 'Components/Checkbox',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const WithChildren: Story = {
  args: {
    ...defaultArgs,
    children: 'Checkbox'
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    children: 'Checkbox',
    disabled: true
  }
};

export const ReadOnly: Story = {
  args: {
    ...defaultArgs,
    children: 'Checkbox',
    readOnly: true
  }
};

export const Indeterminate: Story = {
  args: {
    ...defaultArgs,
    children: 'Checkbox',
    indeterminate: true
  }
};

const ColorTemplate = (CheckboxProps: CheckboxProps) => {
  return (
    <>
      <Checkbox {...CheckboxProps} color="red">
        Red
      </Checkbox>
      <Checkbox {...CheckboxProps} color="orange">
        Orange
      </Checkbox>
      <Checkbox {...CheckboxProps} color="yellow">
        Yellow
      </Checkbox>
      <Checkbox {...CheckboxProps} color="green">
        Green
      </Checkbox>
      <Checkbox {...CheckboxProps} color="cyan">
        Cyan
      </Checkbox>
      <Checkbox {...CheckboxProps} color="blue">
        Blue
      </Checkbox>
      <Checkbox {...CheckboxProps} color="violet">
        Violet
      </Checkbox>
    </>
  );
};

export const Color: Story = {
  render: ColorTemplate,
  args: {
    ...defaultArgs,
    children: 'Checkbox',
    defaultChecked: true
  }
};
