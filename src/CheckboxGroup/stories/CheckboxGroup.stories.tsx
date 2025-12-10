import React from 'react';
import type { StoryObj } from '@storybook/react';
import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../../Checkbox';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(CheckboxGroup);

export default {
  title: 'Components/CheckboxGroup',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: [
    <Checkbox key="1" value="1">
      Checkbox
    </Checkbox>,
    <Checkbox key="2" value="2">
      Checkbox
    </Checkbox>,
    <Checkbox key="3" value="3">
      Checkbox
    </Checkbox>
  ]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Inline: Story = {
  args: {
    ...defaultArgs,
    inline: true
  }
};

export const DefaultValue: Story = {
  args: {
    ...defaultArgs,
    defaultValue: ['1', '2']
  }
};

export const Disabled: Story = {
  args: {
    children: [
      <Checkbox key="1" value="1">
        Option 1
      </Checkbox>,
      <Checkbox key="2" value="2" disabled>
        Option 2 (Disabled)
      </Checkbox>,
      <Checkbox key="3" value="3">
        Option 3
      </Checkbox>
    ]
  }
};
