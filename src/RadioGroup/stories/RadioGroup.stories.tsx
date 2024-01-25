import React from 'react';
import type { StoryObj } from '@storybook/react';
import RadioGroup from '../RadioGroup';
import Radio from '../../Radio';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(RadioGroup);

export default {
  title: 'Components/RadioGroup',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: [
    <Radio key="1" value="1">
      Radio
    </Radio>,
    <Radio key="2" value="2">
      Radio
    </Radio>,
    <Radio key="3" value="3">
      Radio
    </Radio>
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
