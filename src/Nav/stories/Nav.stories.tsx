import React from 'react';
import type { StoryObj } from '@storybook/react';
import Nav from '../Nav';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Nav);

export default {
  title: 'Components/Nav',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: [
    <Nav.Item active key="1">
      Home
    </Nav.Item>,
    <Nav.Item key="2">News</Nav.Item>,
    <Nav.Item key="3">Solutions</Nav.Item>,
    <Nav.Item key="4">Products</Nav.Item>,
    <Nav.Menu key="5" title="About">
      <Nav.Item>About company</Nav.Item>
      <Nav.Item>Contact us</Nav.Item>
    </Nav.Menu>
  ]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Tabs: Story = {
  args: {
    ...defaultArgs,
    appearance: 'tabs'
  }
};

export const Subtle: Story = {
  args: {
    ...defaultArgs,
    appearance: 'subtle'
  }
};

export const Vertical: Story = {
  args: {
    ...defaultArgs,
    vertical: true
  }
};

export const Justified: Story = {
  args: {
    ...defaultArgs,
    justified: true
  }
};
