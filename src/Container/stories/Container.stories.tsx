import React from 'react';
import type { StoryObj } from '@storybook/react';
import Container from '../Container';
import Header from '../../Header';
import Footer from '../../Footer';
import Content from '../../Content';
import Sidebar from '../../Sidebar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Header/styles/index.less';
import '../../Footer/styles/index.less';
import '../../Content/styles/index.less';
import '../../Sidebar/styles/index.less';
import './styles.less';

const meta = createMeta(Container);

export default {
  title: 'Components/Container',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  className: 'show-container'
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </>
    )
  }
};

export const Layout1: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Sidebar>Sidebar</Sidebar>
        <Container>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Container>
      </>
    )
  }
};

export const Layout2: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Header>Header</Header>
        <Container>
          <Sidebar>Sidebar</Sidebar>
          <Content>Content</Content>
        </Container>
        <Footer>Footer</Footer>
      </>
    )
  }
};

export const Layout3: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Header>Header</Header>
        <Container>
          <Content>Content</Content>
          <Sidebar>Sidebar</Sidebar>
        </Container>
        <Footer>Footer</Footer>
      </>
    )
  }
};
