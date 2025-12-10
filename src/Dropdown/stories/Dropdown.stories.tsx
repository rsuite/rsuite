import React from 'react';
import type { StoryObj } from '@storybook/react';
import Dropdown from '../Dropdown';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

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

export const WithIcon: Story = {
  args: {
    ...defaultArgs,
    title: 'Download',
    icon: <FileDownloadIcon />
  }
};

export const WithDivider: Story = {
  args: {
    title: 'Actions',
    children: (
      <>
        <Dropdown.Item>New File</Dropdown.Item>
        <Dropdown.Item>Save</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>About</Dropdown.Item>
      </>
    )
  }
};

export const Placement: Story = {
  args: {
    ...defaultArgs,
    placement: 'bottomEnd'
  }
};

export const ActiveItem: Story = {
  args: {
    title: 'Menu',
    children: (
      <>
        <Dropdown.Item>Home</Dropdown.Item>
        <Dropdown.Item active>Products</Dropdown.Item>
        <Dropdown.Item>About</Dropdown.Item>
        <Dropdown.Item>Contact</Dropdown.Item>
      </>
    )
  }
};
