import type { StoryObj } from '@storybook/react';
import Kbd from '../Kbd';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Text/styles/index.less';

const meta = createMeta(Kbd);

export default {
  title: 'Components/Kbd',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Kbd'
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Sizes: Story = {
  args: {
    ...defaultArgs,
    size: 'lg'
  }
};
