import type { StoryObj } from '@storybook/react';
import AutoComplete from '../AutoComplete';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const data = [
  'Eugenia',
  'Bryan',
  'Linda',
  'Nancy',
  'Lloyd',
  'Alice',
  'Julia',
  'Albert',
  'Louisa',
  'Lester',
  'Lola',
  'Lydia',
  'Hal',
  'Hannah',
  'Harriet',
  'Hattie',
  'Hazel',
  'Hilda'
];

const meta = createMeta(AutoComplete);

export default {
  title: 'Components/AutoComplete',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: { width: 200 },
  data
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};

export const Readnly: Story = {
  args: {
    ...defaultArgs,
    readOnly: true
  }
};

export const Plaintext: Story = {
  args: {
    ...defaultArgs,
    plaintext: true
  }
};

export const Size: Story = {
  args: {
    ...defaultArgs,
    size: 'lg'
  }
};
