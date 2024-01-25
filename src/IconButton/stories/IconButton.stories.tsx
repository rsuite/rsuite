import React from 'react';
import type { StoryObj } from '@storybook/react';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import IconButton, { IconButtonProps } from '../IconButton';
import ButtonToolbar from '../../ButtonToolbar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../ButtonToolbar/styles/index.less';

const meta = createMeta(IconButton);

export default {
  title: 'Components/IconButton',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultProps: Story['args'] = {
  icon: <AddOutlineIcon />,
  children: 'Button'
};

const AppearanceTemplate = (buttonProps: IconButtonProps) => {
  return (
    <ButtonToolbar>
      <IconButton {...buttonProps}>Default</IconButton>
      <IconButton {...buttonProps} appearance="primary">
        Primary
      </IconButton>
    </ButtonToolbar>
  );
};

const SizeTemplate = (buttonProps: IconButtonProps) => {
  return (
    <ButtonToolbar>
      <IconButton {...buttonProps} size="xs">
        Extra Small
      </IconButton>
      <IconButton {...buttonProps} size="sm">
        Small
      </IconButton>
      <IconButton {...buttonProps} size="md">
        Medium
      </IconButton>
      <IconButton {...buttonProps} size="lg">
        Large
      </IconButton>
    </ButtonToolbar>
  );
};

const ColorTemplate = (buttonProps: IconButtonProps) => {
  return (
    <ButtonToolbar>
      <IconButton {...buttonProps} color="red">
        Red
      </IconButton>
      <IconButton {...buttonProps} color="orange">
        Orange
      </IconButton>
      <IconButton {...buttonProps} color="yellow">
        Yellow
      </IconButton>
      <IconButton {...buttonProps} color="green">
        Green
      </IconButton>
      <IconButton {...buttonProps} color="cyan">
        Cyan
      </IconButton>
      <IconButton {...buttonProps} color="blue">
        Blue
      </IconButton>
      <IconButton {...buttonProps} color="violet">
        Violet
      </IconButton>
    </ButtonToolbar>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    ...defaultProps
  }
};

export const Appearances: Story = {
  args: {
    ...defaultProps
  },
  render: AppearanceTemplate
};

export const Disabled: Story = {
  render: AppearanceTemplate,
  args: {
    ...defaultProps,
    disabled: true
  }
};

export const Loading: Story = {
  render: AppearanceTemplate,
  args: {
    ...defaultProps,
    loading: true
  }
};

export const Active: Story = {
  render: AppearanceTemplate,
  args: {
    ...defaultProps,
    active: true
  }
};

export const Block: Story = {
  render: AppearanceTemplate,
  args: {
    ...defaultProps,
    block: true
  }
};

export const Color: Story = {
  render: ColorTemplate,
  args: {
    ...defaultProps,
    appearance: 'primary'
  }
};

export const Size: Story = {
  render: SizeTemplate,
  args: {
    ...defaultProps
  }
};
