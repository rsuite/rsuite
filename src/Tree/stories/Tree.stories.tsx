import React from 'react';
import type { StoryObj } from '@storybook/react';
import Tree from '../';
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

const meta = createMeta(Tree);

export default {
  title: 'Components/Tree',
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

const TreeTemplate = ({ draggable, data, ...args }: any) => {
  const [treeData, setTreeData] = React.useState(data);
  return (
    <Tree
      {...args}
      data={treeData}
      draggable={draggable}
      onDrop={({ createUpdateDataFunction }) => setTreeData(createUpdateDataFunction(treeData))}
    />
  );
};

export const Draggable: Story = {
  render: TreeTemplate,
  args: {
    ...defaultArgs,
    draggable: true,
    defaultExpandAll: true
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
