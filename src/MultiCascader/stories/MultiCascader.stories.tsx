import type { StoryObj } from '@storybook/react';
import MultiCascader from '../MultiCascader';
import { createMeta } from '@/storybook/utils';
import { mockTreeData } from '@/storybook/mocks';
import '../styles/index.less';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, _value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const meta = createMeta(MultiCascader);

export default {
  title: 'Components/MultiCascader',
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
