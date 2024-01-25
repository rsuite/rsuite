import React from 'react';
import type { StoryObj } from '@storybook/react';
import PanelGroup from '../PanelGroup';
import Panel from '../../Panel';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(PanelGroup);

export default {
  title: 'Components/PanelGroup',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <Panel header="Panel 1">Panel Content</Panel>
      <Panel header="Panel 2">Panel Content</Panel>
      <Panel header="Panel 3">Panel Content</Panel>
    </>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Bordered: Story = {
  args: {
    ...defaultArgs,
    bordered: true
  }
};

export const Collapsible: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    accordion: true
  }
};
