import React from 'react';
import type { StoryObj } from '@storybook/react';
import Drawer from '../Drawer';
import Button from '../../Button';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Button/styles/index.less';

const meta = createMeta(Drawer);

export default {
  title: 'Components/Drawer',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  open: true,
  children: (
    <>
      <Drawer.Header>
        <Drawer.Title>Drawer Title</Drawer.Title>
        <Drawer.Actions>
          <Button>Cancel</Button>
          <Button appearance="primary">Confirm</Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>Body</Drawer.Body>
    </>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const PlacementLeft: Story = {
  args: {
    ...defaultArgs,
    placement: 'left'
  }
};

export const PlacementRight: Story = {
  args: {
    ...defaultArgs,
    placement: 'right'
  }
};

export const PlacementTop: Story = {
  args: {
    ...defaultArgs,
    placement: 'top'
  }
};

export const PlacementBottom: Story = {
  args: {
    ...defaultArgs,
    placement: 'bottom'
  }
};

export const Size: Story = {
  args: {
    ...defaultArgs,
    size: '50%'
  }
};

export const Fullscreen: Story = {
  args: {
    ...defaultArgs,
    size: 'full'
  }
};

export const BackdropHidden: Story = {
  args: {
    ...defaultArgs,
    backdrop: false
  }
};

export const BackdropStatic: Story = {
  args: {
    ...defaultArgs,
    backdrop: 'static'
  }
};
