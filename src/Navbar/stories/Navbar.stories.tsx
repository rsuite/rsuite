import React from 'react';
import type { StoryObj } from '@storybook/react';
import Nav from '../../Nav';
import Navbar from '../Navbar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(Navbar);

export default {
  title: 'Components/Navbar',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <Nav>
      <Nav.Item active key="1">
        Home
      </Nav.Item>
      <Nav.Item key="2">News</Nav.Item>
      <Nav.Item key="3">Solutions</Nav.Item>
      <Nav.Item key="4">Products</Nav.Item>
      <Nav.Menu key="5" title="About">
        <Nav.Item>About company</Nav.Item>
        <Nav.Item>Contact us</Nav.Item>
      </Nav.Menu>
    </Nav>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Inverse: Story = {
  args: {
    ...defaultArgs,
    appearance: 'inverse'
  }
};

export const Subtle: Story = {
  args: {
    ...defaultArgs,
    appearance: 'subtle'
  }
};

export const WithContent: Story = {
  args: {
    children: (
      <Navbar>
        <Navbar.Brand>RSuite</Navbar.Brand>
        <Nav>
          <Nav.Item active>Home</Nav.Item>
          <Nav.Item>News</Nav.Item>
          <Nav.Item>Products</Nav.Item>
        </Nav>
        <Navbar.Content>
          <Nav>
            <Nav.Item>Login</Nav.Item>
            <Nav.Item>Sign Up</Nav.Item>
          </Nav>
        </Navbar.Content>
      </Navbar>
    )
  }
};
