import type { StoryObj } from '@storybook/react';
import CheckTree from '../';
import { createMeta } from '@/storybook/utils';
import { mockTreeData, mockAsyncData } from '@/storybook/mocks';
import '../styles/index.less';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, _value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const meta = createMeta(CheckTree);

export default {
  title: 'Components/CheckTree',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  data
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const ShowIndentLine: Story = {
  args: {
    ...defaultArgs,
    showIndentLine: true
  }
};

export const NotCascading: Story = {
  args: {
    ...defaultArgs,
    cascade: false
  }
};

const [getNodes, fetchNodes] = mockAsyncData();

export const Async: Story = {
  args: {
    ...defaultArgs,
    data: getNodes(5) as any,
    getChildren: fetchNodes as any
  }
};
