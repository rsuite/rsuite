import React from 'react';
import type { StoryObj } from '@storybook/react';
import AutoComplete from '../AutoComplete';
import Stack from '../../Stack';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../Stack/styles/index.scss';

const data = [
  'Eugenia',
  'Bryan',
  'Linda',
  'Nancy',
  'Lloyd',
  'Alice',
  'Julia',
  'Albert',
  'Louisa',
  'Lester',
  'Lola',
  'Lydia',
  'Hal',
  'Hannah',
  'Harriet',
  'Hattie',
  'Hazel',
  'Hilda'
];

const meta = createMeta(AutoComplete);

export default {
  title: 'Components/AutoComplete',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: { width: 200 },
  data
};

export const Default: Story = {
  args: {
    ...defaultArgs
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
    readOnly: true,
    defaultValue: 'Bryan'
  }
};

export const Plaintext: Story = {
  args: {
    ...defaultArgs,
    plaintext: true,
    defaultValue: 'Bryan'
  }
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={10} direction="column" alignItems="flex-start">
      <AutoComplete data={data} size="xs" placeholder="Extra Small" style={{ width: 200 }} />
      <AutoComplete data={data} size="sm" placeholder="Small" style={{ width: 200 }} />
      <AutoComplete data={data} size="md" placeholder="Medium" style={{ width: 200 }} />
      <AutoComplete data={data} size="lg" placeholder="Large" style={{ width: 200 }} />
    </Stack>
  )
};

export const CustomRender: Story = {
  args: {
    ...defaultArgs,
    renderOption: (label: React.ReactNode) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#3498ff',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12
          }}
        >
          {String(label).charAt(0)}
        </span>
        <span>{label}</span>
      </div>
    )
  }
};

export const CustomFilter: Story = {
  args: {
    ...defaultArgs,
    filterBy: (value: string, item: any) => {
      const itemValue = typeof item === 'string' ? item : item.label;
      return itemValue.toLowerCase().includes(value.toLowerCase());
    },
    placeholder: 'Type to search (case-insensitive)'
  }
};
