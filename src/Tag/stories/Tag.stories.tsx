import type { StoryObj } from '@storybook/react';
import Tag, { TagProps } from '../Tag';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Tag);

export default {
  ...meta,
  title: 'Components/Tag'
};

type Story = StoryObj<typeof meta>;

const defaultArgs: TagProps = {
  children: 'Tag'
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Closable: Story = {
  args: {
    ...defaultArgs,
    closable: true
  }
};

export const Size: Story = {
  args: {
    ...defaultArgs,
    size: 'lg'
  }
};

export const Color: Story = {
  args: {
    ...defaultArgs,
    color: 'red'
  }
};
