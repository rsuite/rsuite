import type { Meta, StoryObj } from '@storybook/react';
import AutoComplete from '../AutoComplete';
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

const meta = {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'padded'
  },
  argTypes: {}
} as Meta<typeof AutoComplete>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  data
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    ...defaultArgs
  }
};
