import React from 'react';
import type { StoryObj } from '@storybook/react';
import Heading, { HeadingProps } from '../Heading';
import HeadingGroup from '../../HeadingGroup';
import Text from '../../Text';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Text/styles/index.less';

const meta = createMeta(Heading);

export default {
  title: 'Components/Heading',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Heading'
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

const LevelTemplate = (props: HeadingProps) => {
  return (
    <>
      <Heading {...props} level={1} />
      <Heading {...props} level={2} />
      <Heading {...props} level={3} />
      <Heading {...props} level={4} />
      <Heading {...props} level={5} />
      <Heading {...props} level={6} />
    </>
  );
};

export const Level: Story = {
  render: LevelTemplate,
  args: {
    ...defaultArgs,
    level: 1
  }
};

export const Subheading: Story = {
  render: () => (
    <HeadingGroup>
      <Heading>ACME Corporation</Heading>
      <Text muted>The leaders in arbitrary fast delivery since 1920</Text>
    </HeadingGroup>
  )
};
