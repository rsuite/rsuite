import React from 'react';
import type { StoryObj } from '@storybook/react';
import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../../Checkbox';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

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
