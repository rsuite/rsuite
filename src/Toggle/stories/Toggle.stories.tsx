import React from 'react';
import type { StoryObj } from '@storybook/react';
import Toggle from '../Toggle';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Toggle);

export default {
  title: 'Components/Toggle',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {};

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

export const Checked: Story = {
  args: {
    ...defaultArgs,
    checked: true
  }
};

export const Size: Story = {
  args: {
    ...defaultArgs,
    size: 'sm'
  }
};

export const CustomText: Story = {
  args: {
    ...defaultArgs,
    checkedChildren: 'ON',
    unCheckedChildren: 'OFF'
  }
};

export const CustomIcon: Story = {
  args: {
    ...defaultArgs,
    checkedChildren: <CheckIcon />,
    unCheckedChildren: <CloseIcon />
  }
};

export const Loading: Story = {
  args: {
    ...defaultArgs,
    loading: true
  }
};
