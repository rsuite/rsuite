import React from 'react';
import type { StoryObj } from '@storybook/react';
import Nav from '../../Nav';
import Sidenav from '../Sidenav';
import { createMeta } from '@/storybook/utils';
import '../../Nav/styles/index.less';
import '../styles/index.less';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

const meta = createMeta(Sidenav);

export default {
  title: 'Components/Sidenav',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: {
    width: 240
  },
  children: (
    <Nav>
      <Nav.Item active key="1" icon={<DashboardIcon />}>
        Home
      </Nav.Item>
      <Nav.Item key="2" icon={<GroupIcon />}>
        News
      </Nav.Item>
      <Nav.Item key="3" icon={<MagicIcon />}>
        Solutions
      </Nav.Item>
      <Nav.Menu key="5" title="About" icon={<GearCircleIcon />}>
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
