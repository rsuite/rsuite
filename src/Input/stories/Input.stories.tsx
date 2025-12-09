import React from 'react';
import type { StoryObj } from '@storybook/react';
import SearchIcon from '@rsuite/icons/Search';
import Input from '../Input';
import InputGroup from '../../InputGroup';
import Stack from '../../Stack';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../InputGroup/styles/index.scss';
import '../../Stack/styles/index.scss';
import '../../Button/styles/index.scss';

const meta = createMeta(Input);

export default {
  title: 'Components/Input',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  style: { width: 200 }
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
    defaultValue: 'Readonly value'
  }
};

export const Plaintext: Story = {
  args: {
    ...defaultArgs,
    plaintext: true,
    defaultValue: 'Plaintext value'
  }
};

export const WithPlaceholder: Story = {
  args: {
    ...defaultArgs,
    placeholder: 'Enter your text here...'
  }
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={10} direction="column" alignItems="flex-start">
      <Input size="xs" placeholder="Extra Small" style={{ width: 200 }} />
      <Input size="sm" placeholder="Small" style={{ width: 200 }} />
      <Input size="md" placeholder="Medium (default)" style={{ width: 200 }} />
      <Input size="lg" placeholder="Large" style={{ width: 200 }} />
    </Stack>
  )
};

export const Textarea: Story = {
  args: {
    ...defaultArgs,
    as: 'textarea',
    rows: 5
  }
};

export const InputGroupAddon: Story = {
  render: props => (
    <Stack spacing={10} direction="column" alignItems="flex-start">
      <InputGroup style={{ width: 300 }}>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Input {...props} placeholder="username" />
      </InputGroup>

      <InputGroup style={{ width: 300 }}>
        <Input {...props} placeholder="domain" />
        <InputGroup.Addon>.com</InputGroup.Addon>
      </InputGroup>

      <InputGroup style={{ width: 300 }}>
        <InputGroup.Addon>$</InputGroup.Addon>
        <Input {...props} placeholder="amount" />
        <InputGroup.Addon>.00</InputGroup.Addon>
      </InputGroup>

      <InputGroup style={{ width: 300 }}>
        <Input {...props} placeholder="from" />
        <InputGroup.Addon>to</InputGroup.Addon>
        <Input {...props} placeholder="to" />
      </InputGroup>

      <InputGroup style={{ width: 300 }}>
        <Input {...props} placeholder="Search" />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup>
    </Stack>
  ),
  args: {
    ...defaultArgs
  }
};

export const InputGroupInside: Story = {
  render: props => (
    <Stack spacing={10} direction="column" alignItems="flex-start">
      <InputGroup inside style={{ width: 300 }}>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Input {...props} placeholder="username" />
      </InputGroup>

      <InputGroup inside style={{ width: 300 }}>
        <Input {...props} placeholder="domain" />
        <InputGroup.Addon>.com</InputGroup.Addon>
      </InputGroup>

      <InputGroup inside style={{ width: 300 }}>
        <InputGroup.Addon>$</InputGroup.Addon>
        <Input {...props} placeholder="amount" />
        <InputGroup.Addon>.00</InputGroup.Addon>
      </InputGroup>

      <InputGroup inside style={{ width: 300 }}>
        <Input {...props} placeholder="from" />
        <InputGroup.Addon>to</InputGroup.Addon>
        <Input {...props} placeholder="to" />
      </InputGroup>

      <InputGroup inside style={{ width: 300 }}>
        <Input {...props} placeholder="Search" />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup>
    </Stack>
  ),
  args: {
    ...defaultArgs
  }
};

export const InputGroupWithButton: Story = {
  render: () => (
    <Stack spacing={10} direction="column" alignItems="flex-start">
      <InputGroup style={{ width: 300 }}>
        <Input placeholder="Search..." />
        <InputGroup.Button>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>

      <InputGroup style={{ width: 300 }}>
        <Input placeholder="Enter URL" />
        <InputGroup.Button appearance="primary">Go</InputGroup.Button>
      </InputGroup>

      <InputGroup style={{ width: 300 }}>
        <InputGroup.Button>
          <SearchIcon />
        </InputGroup.Button>
        <Input placeholder="Search with button on left" />
      </InputGroup>
    </Stack>
  )
};
