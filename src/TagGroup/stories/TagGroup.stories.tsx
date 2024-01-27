import React from 'react';
import type { StoryObj } from '@storybook/react';
import TagGroup, { TagGroupProps } from '../TagGroup';
import Tag from '../../Tag';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Tag/styles/index.less';

const meta = createMeta(TagGroup);

export default {
  ...meta,
  title: 'Components/TagGroup'
};

type Story = StoryObj<typeof meta>;

const defaultArgs: TagGroupProps = {
  children: (
    <>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag>
      <Tag>Tag 3</Tag>
    </>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};
