import type { StoryObj, Meta } from '@storybook/react';
import TagPicker from '../';
import { createMeta } from '@/storybook/utils';
import { mockArrayData } from '@/storybook/mocks';
import '../styles/index.less';

const data = mockArrayData();
const meta = createMeta(TagPicker) as Meta<typeof TagPicker>;

export default {
  title: 'Components/TagPicker',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: {
    width: 260
  },
  data
};

export const Default: Story = {
  args: {
    ...defaultArgs
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
    placeholder: 'Large Size',
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
