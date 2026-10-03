import React from 'react';
import type { StoryObj } from '@storybook/react';
import Splitter from '../Splitter';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';

const meta = createMeta(Splitter);
export default { ...meta, title: 'Components/Splitter' };
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultSizes: [30, 70],
    style: { width: 640, height: 240 },
    children: [
      <Splitter.Panel key="navigation" aria-label="Navigation" minSize={15} maxSize={60}>
        Navigation
      </Splitter.Panel>,
      <Splitter.Panel key="content" aria-label="Content" minSize={30}>
        Content
      </Splitter.Panel>
    ]
  }
};

export const Vertical: Story = { args: { ...Default.args, orientation: 'vertical' } };
export const Disabled: Story = { args: { ...Default.args, disabled: true } };
export const RTL: Story = { args: { ...Default.args, dir: 'rtl' } };
