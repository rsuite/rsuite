import React from 'react';
import type { StoryObj } from '@storybook/react';
import AdminIcon from '@rsuite/icons/Admin';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import PageIcon from '@rsuite/icons/Page';
import MultiCascadeTree from '../';
import type { ItemDataType } from '@/internals/types';
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

const meta = createMeta(MultiCascadeTree);

export default {
  title: 'Components/MultiCascadeTree',
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

const Column = ({ header, children }) => {
  return (
    <div>
      <div
        style={{
          background: '#154c94',
          padding: '4px 10px',
          color: ' #fff',
          textAlign: 'center'
        }}
      >
        {header}
      </div>
      {children}
    </div>
  );
};

const headers = ['Job Area', 'Job Type', 'Name'];

export const CustomColumn: Story = {
  args: {
    ...defaultArgs,
    columnWidth: 180,
    renderTreeNode: label => {
      return (
        <>
          <AdminIcon /> {label}
        </>
      );
    },
    renderColumn: (childNodes, { layer }: any) => {
      return <Column header={headers[layer]}> {childNodes}</Column>;
    }
  }
};

const [getNodes, fetchNodes] = mockAsyncData();

const AsyncLoadTemplate = (props: any) => {
  const [value, setValue] = React.useState();
  return <MultiCascadeTree {...props} value={value} onChange={setValue} getChildren={fetchNodes} />;
};

export const AsyncLoadData: Story = {
  render: AsyncLoadTemplate,
  args: {
    ...defaultArgs,
    columnWidth: 180,
    data: getNodes(5) as any,
    getChildren: (node: ItemDataType<any>) => {
      return fetchNodes(node.id) as Promise<ItemDataType<any>>[];
    },
    renderTreeNode: (label, item) => {
      return (
        <>
          {item.children ? <FolderFillIcon /> : <PageIcon />} {label}
        </>
      );
    }
  }
};
