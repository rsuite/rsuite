import type { StoryObj } from '@storybook/react';
import Pagination from '../';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Pagination);

export default {
  title: 'Components/Pagination',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  total: 100,
  limit: 10
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Size: Story = {
  args: {
    ...defaultArgs,
    size: 'lg'
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true
  }
};

export const PrevNext: Story = {
  args: {
    ...defaultArgs,
    prev: true,
    next: true
  }
};

export const FirstLast: Story = {
  args: {
    ...defaultArgs,
    first: true,
    last: true
  }
};

export const MaxButtons: Story = {
  args: {
    ...defaultArgs,
    maxButtons: 5
  }
};

export const ActivePage: Story = {
  args: {
    ...defaultArgs,
    activePage: 5
  }
};

export const BoundaryLinks: Story = {
  args: {
    ...defaultArgs,
    maxButtons: 5,
    activePage: 5,
    ellipsis: true,
    boundaryLinks: true
  }
};

export const ShowTotal: Story = {
  args: {
    ...defaultArgs,
    size: 'xs',
    layout: ['total', '|', 'pager']
  }
};

export const ShowLimit: Story = {
  args: {
    ...defaultArgs,
    style: {
      marginTop: 200
    },
    size: 'xs',
    limitOptions: [30, 50, 100],
    limit: 30,
    layout: ['limit', '|', 'pager']
  }
};

export const ShowJumper: Story = {
  args: {
    ...defaultArgs,
    size: 'xs',
    layout: ['pager', '|', 'skip']
  }
};
