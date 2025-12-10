import React from 'react';
import type { StoryObj } from '@storybook/react';
import PasswordInput from '../PasswordInput';
import LockIcon from '@rsuite/icons/legacy/Lock';
import UserIcon from '@rsuite/icons/legacy/User';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../InputGroup/styles/index.scss';
import '../../Input/styles/index.scss';

const meta = createMeta(PasswordInput);

export default {
  title: 'Components/PasswordInput',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  placeholder: 'Enter your password',
  style: { width: 260 }
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const WithIcons: Story = {
  args: {
    ...defaultArgs,
    startIcon: <UserIcon />,
    endIcon: <LockIcon />
  }
};

export const ControlledVisibility: Story = {
  render: props => {
    const [visible, setVisible] = React.useState(false);

    return (
      <PasswordInput
        {...props}
        visible={visible}
        onVisibleChange={setVisible}
        placeholder={props.placeholder}
      />
    );
  },
  args: {
    ...defaultArgs
  }
};

export const CustomVisibilityIcon: Story = {
  args: {
    ...defaultArgs,
    renderVisibilityIcon: visible => <span aria-hidden="true">{visible ? 'Hide' : 'Show'}</span>
  }
};
