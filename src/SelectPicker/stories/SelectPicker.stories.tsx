import type { StoryObj } from '@storybook/react';
import SelectPicker from '../SelectPicker';
import { createMeta } from '@/storybook/utils';
import { mockArrayData } from '@/storybook/mocks';
import '../styles/index.less';

const data = mockArrayData();
const meta = createMeta(SelectPicker);

export default {
  title: 'Components/SelectPicker',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: {
    width: 200
  },
  data
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const WithLabel: Story = {
  args: {
    ...defaultArgs,
    label: 'Label'
  }
};

export const Loading: Story = {
  args: {
    ...defaultArgs,
    loading: true
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};

export const Readonly: Story = {
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
    style: {
      width: 300
    },
    label: 'Large Size',
    size: 'lg'
  }
};

export const Group: Story = {
  args: {
    ...defaultArgs,
    groupBy: 'role'
  }
};
