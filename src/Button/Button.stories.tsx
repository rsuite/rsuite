import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
  //👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
  args: {
    children: 'Button'
  },
  argTypes: {
    appearance: {
      options: ['default', 'primary', 'link', 'subtle', 'ghost'],
      control: { type: 'select' },
      defaultValue: 'default'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    appearance: 'primary'
  }
};

export const Large: Story = {
  args: {
    size: 'lg'
  }
};

export const Active: Story = {
  args: {
    active: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const Loading: Story = {
  args: {
    loading: true
  }
};
