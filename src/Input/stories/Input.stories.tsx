import React from 'react';
import type { StoryObj } from '@storybook/react';
import SearchIcon from '@rsuite/icons/Search';
import Input from '../Input';
import InputGroup from '../../InputGroup';
import Stack from '../../Stack';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../InputGroup/styles/index.less';
import '../../Stack/styles/index.less';

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

export const Readnly: Story = {
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
    size: 'lg'
  }
};

export const Textarea: Story = {
  args: {
    ...defaultArgs,
    as: 'textarea'
  }
};

export const InputGroupAddon: Story = {
  render: props => (
    <Stack spacing={10} direction="column" alignItems="flex-start">
      <InputGroup>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Input {...props} />
      </InputGroup>

      <InputGroup>
        <Input {...props} />
        <InputGroup.Addon>.com</InputGroup.Addon>
      </InputGroup>

      <InputGroup>
        <InputGroup.Addon>$</InputGroup.Addon>
        <Input {...props} />
        <InputGroup.Addon>.00</InputGroup.Addon>
      </InputGroup>

      <InputGroup>
        <Input {...props} />
        <InputGroup.Addon>to</InputGroup.Addon>
        <Input {...props} />
      </InputGroup>

      <InputGroup>
        <Input {...props} />
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
      <InputGroup inside>
        <InputGroup.Addon> @</InputGroup.Addon>
        <Input {...props} />
      </InputGroup>

      <InputGroup inside>
        <Input {...props} />
        <InputGroup.Addon>.com</InputGroup.Addon>
      </InputGroup>

      <InputGroup inside>
        <InputGroup.Addon>$</InputGroup.Addon>
        <Input {...props} />
        <InputGroup.Addon>.00</InputGroup.Addon>
      </InputGroup>

      <InputGroup inside>
        <Input {...props} />
        <InputGroup.Addon>to</InputGroup.Addon>
        <Input {...props} />
      </InputGroup>

      <InputGroup inside>
        <Input {...props} />
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
