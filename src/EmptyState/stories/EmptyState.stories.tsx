import React from 'react';
import SearchIcon from '@rsuite/icons/Search';
import type { StoryObj } from '@storybook/react';
import Button from '../../Button';
import EmptyState from '../EmptyState';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../Button/styles/index.scss';

const meta = createMeta(EmptyState);
export default { ...meta, title: 'Components/EmptyState' };
type Story = StoryObj<typeof meta>;

export const NoResults: Story = {
  args: {
    icon: <SearchIcon />,
    title: 'No results found',
    description: 'Try changing your search or removing a filter.',
    children: <Button appearance="primary">Clear filters</Button>
  }
};

export const FirstProject: Story = {
  args: {
    title: 'Create your first project',
    description: 'Projects keep your team’s work together.',
    align: 'start',
    children: <Button appearance="primary">Create project</Button>
  }
};

export const Compact: Story = { ...NoResults, args: { ...NoResults.args, size: 'sm' } };
