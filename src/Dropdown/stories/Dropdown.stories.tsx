import React from 'react';
import type { StoryObj } from '@storybook/react';
import Dropdown from '../Dropdown';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Dropdown);

export default {
  title: 'Components/Dropdown',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  title: 'Dropdown',
  children: (
    <>
      <Dropdown.Item>New File</Dropdown.Item>
      <Dropdown.Item>New File with Current Profile</Dropdown.Item>
      <Dropdown.Item>Download As...</Dropdown.Item>
      <Dropdown.Item>Export PDF</Dropdown.Item>
      <Dropdown.Item>Export HTML</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>About</Dropdown.Item>
    </>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const TriggerHover: Story = {
  args: {
    ...defaultArgs,
    trigger: 'hover'
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};
