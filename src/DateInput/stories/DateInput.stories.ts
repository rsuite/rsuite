import type { StoryObj } from '@storybook/react';
import DateInput from '../DateInput';
import { createMeta } from '@/storybook/utils';

import '../styles/index.less';

const meta = createMeta(DateInput);

export default {
  title: 'Components/DateInput',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs: Story['args'] = {
  format: 'yyyy-MM-dd'
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
