import React from 'react';
import type { StoryObj } from '@storybook/react';
import Tabs, { TabsProps } from '../Tabs';
import ImageIcon from '@rsuite/icons/Image';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import SpeakerIcon from '@rsuite/icons/Speaker';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Tabs);

export default {
  ...meta,
  title: 'Components/Tabs'
};

type Story = StoryObj<typeof meta>;

const defaultArgs: TabsProps = {
  defaultActiveKey: '1',
  children: (
    <>
      <Tabs.Tab eventKey="1" title="Tab 1">
        Panel 1
      </Tabs.Tab>
      <Tabs.Tab eventKey="2" title="Tab 2">
        Panel 2
      </Tabs.Tab>
      <Tabs.Tab eventKey="3" title="Tab 3">
        Panel 3
      </Tabs.Tab>
    </>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Vertical: Story = {
  args: {
    ...defaultArgs,
    vertical: true
  }
};

export const Reversed: Story = {
  args: {
    ...defaultArgs,
    reversed: true
  }
};

export const Subtle: Story = {
  args: {
    ...defaultArgs,
    appearance: 'subtle'
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Tabs.Tab eventKey="1" title="Tab 1">
          Panel 1
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="Tab 2" disabled>
          Panel 2
        </Tabs.Tab>
        <Tabs.Tab eventKey="3" title="Tab 3">
          Panel 3
        </Tabs.Tab>
      </>
    )
  }
};

export const WithIcon: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Tabs.Tab eventKey="1" title="Tab 1" icon={<ImageIcon />}>
          Panel 1
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="Tab 2" icon={<AddOutlineIcon />}>
          Panel 2
        </Tabs.Tab>
        <Tabs.Tab eventKey="3" title="Tab 3" icon={<SpeakerIcon />}>
          Panel 3
        </Tabs.Tab>
      </>
    )
  }
};
