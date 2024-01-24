import type { StoryObj, Meta } from '@storybook/react';
import TagInput from '../';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(TagInput) as Meta<typeof TagInput>;

export default {
  title: 'Components/TagInput',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: {
    width: 260
  }
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

export const TagTriggerSpace: Story = {
  args: {
    ...defaultArgs,
    trigger: 'Space'
  }
};

export const TagTriggerEnter: Story = {
  args: {
    ...defaultArgs,
    trigger: 'Enter'
  }
};

export const TagTriggerComma: Story = {
  args: {
    ...defaultArgs,
    trigger: 'Comma'
  }
};
