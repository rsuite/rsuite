import React from 'react';
import type { StoryObj } from '@storybook/react';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import Button, { ButtonProps } from '../Button';
import ButtonToolbar from '../../ButtonToolbar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../ButtonToolbar/styles/index.scss';

const meta = createMeta(Button);

export default {
  title: 'Components/Button',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultProps: Story['args'] = {
  children: 'Button'
};

const AppearanceTemplate = (buttonProps: ButtonProps) => {
  return (
    <ButtonToolbar>
      <Button {...buttonProps}>Default</Button>
      <Button {...buttonProps} appearance="primary">
        Primary
      </Button>
      <Button {...buttonProps} appearance="link">
        Link
      </Button>
      <Button {...buttonProps} appearance="subtle">
        Subtle
      </Button>
      <Button {...buttonProps} appearance="ghost">
        Ghost
      </Button>
    </ButtonToolbar>
  );
};

const SizeTemplate = (buttonProps: ButtonProps) => {
  return (
    <ButtonToolbar>
      <Button {...buttonProps} size="xs">
        Extra Small
      </Button>
      <Button {...buttonProps} size="sm">
        Small
      </Button>
      <Button {...buttonProps} size="md">
        Medium
      </Button>
      <Button {...buttonProps} size="lg">
        Large
      </Button>
    </ButtonToolbar>
  );
};

const ColorTemplate = (buttonProps: ButtonProps) => {
  return (
    <ButtonToolbar>
      <Button {...buttonProps} color="red">
        Red
      </Button>
      <Button {...buttonProps} color="orange">
        Orange
      </Button>
      <Button {...buttonProps} color="yellow">
        Yellow
      </Button>
      <Button {...buttonProps} color="green">
        Green
      </Button>
      <Button {...buttonProps} color="cyan">
        Cyan
      </Button>
      <Button {...buttonProps} color="blue">
        Blue
      </Button>
      <Button {...buttonProps} color="violet">
        Violet
      </Button>
    </ButtonToolbar>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Button'
  }
};

export const Appearances: Story = {
  args: {
    children: 'Button'
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

export const Toggleable: Story = {
  render: AppearanceTemplate,
  args: {
    ...defaultProps,
    toggleable: true
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

export const WithIcons: Story = {
  render: AppearanceTemplate,
  args: {
    ...defaultProps,
    startIcon: <AddOutlineIcon />
  }
};

export const WithEndIcon: Story = {
  render: AppearanceTemplate,
  args: {
    ...defaultProps,
    endIcon: <AddOutlineIcon />
  }
};

export const WithBothIcons: Story = {
  render: AppearanceTemplate,
  args: {
    ...defaultProps,
    startIcon: <AddOutlineIcon />,
    endIcon: <AddOutlineIcon />
  }
};

export const IconOnly: Story = {
  args: {
    ...defaultProps,
    children: <AddOutlineIcon />,
    circle: true
  }
};

export const AsLink: Story = {
  args: {
    ...defaultProps,
    as: 'a',
    href: 'https://rsuitejs.com',
    appearance: 'link',
    children: 'RSuite Website'
  }
};
