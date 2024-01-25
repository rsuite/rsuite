import type { StoryObj, Meta } from '@storybook/react';
import InputPicker from '../InputPicker';
import { createMeta } from '@/storybook/utils';
import { mockArrayData } from '@/storybook/mocks';
import '../styles/index.less';

const data = mockArrayData();
const meta = createMeta(InputPicker) as Meta<typeof InputPicker>;

export default {
  title: 'Components/InputPicker',
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

export const Creatable: Story = {
  args: {
    ...defaultArgs,
    creatable: true
  }
};

export const Group: Story = {
  args: {
    ...defaultArgs,
    groupBy: 'role'
  }
};
