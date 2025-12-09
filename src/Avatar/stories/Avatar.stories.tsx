import React from 'react';
import type { StoryObj } from '@storybook/react';
import Avatar from '../Avatar';
import Stack from '../../Stack';
import UserIcon from '@rsuite/icons/legacy/User';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../Stack/styles/index.scss';

const meta = createMeta(Avatar);

export default {
  title: 'Components/Avatar',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  circle: false
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    src: 'https://avatars.githubusercontent.com/u/6412038'
  }
};

export const CircleAvatar: Story = {
  args: {
    ...defaultArgs,
    src: 'https://avatars.githubusercontent.com/u/6412038',
    circle: true
  }
};

export const CharacterAvatar: Story = {
  args: {
    ...defaultArgs,
    children: 'R'
  }
};

export const IconAvatar: Story = {
  args: {
    ...defaultArgs,
    children: <UserIcon />
  }
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={10} alignItems="center">
      <Avatar size="xs" src="https://avatars.githubusercontent.com/u/6412038" />
      <Avatar size="sm" src="https://avatars.githubusercontent.com/u/6412038" />
      <Avatar size="md" src="https://avatars.githubusercontent.com/u/6412038" />
      <Avatar size="lg" src="https://avatars.githubusercontent.com/u/6412038" />
      <Avatar size="xl" src="https://avatars.githubusercontent.com/u/6412038" />
      <Avatar size="xxl" src="https://avatars.githubusercontent.com/u/6412038" />
    </Stack>
  )
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={10} alignItems="center">
      <Avatar color="red">R</Avatar>
      <Avatar color="orange">O</Avatar>
      <Avatar color="yellow">Y</Avatar>
      <Avatar color="green">G</Avatar>
      <Avatar color="cyan">C</Avatar>
      <Avatar color="blue">B</Avatar>
      <Avatar color="violet">V</Avatar>
    </Stack>
  )
};

export const Bordered: Story = {
  render: () => (
    <Stack spacing={10} alignItems="center">
      <Avatar bordered src="https://avatars.githubusercontent.com/u/6412038" />
      <Avatar bordered circle src="https://avatars.githubusercontent.com/u/6412038" />
      <Avatar bordered color="blue">
        B
      </Avatar>
    </Stack>
  )
};
