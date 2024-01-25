import React from 'react';
import type { StoryObj } from '@storybook/react';
import Notification, { NotificationProps } from '../Notification';
import toaster from '../../toaster';
import Button from '../../Button';
import ButtonToolbar from '../../ButtonToolbar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Button/styles/index.less';
import '../../toaster/styles/index.less';

const meta = createMeta(Notification);

export default {
  title: 'Components/Notification',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs: NotificationProps = {
  type: 'info',
  children: 'This is a notification'
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const SuccessNotification: Story = {
  args: {
    ...defaultArgs,
    type: 'success'
  }
};

export const ErrorNotification: Story = {
  args: {
    ...defaultArgs,
    type: 'error'
  }
};

export const WarningNotification: Story = {
  args: {
    ...defaultArgs,
    type: 'warning'
  }
};

export const Header: Story = {
  args: {
    ...defaultArgs,
    header: 'Header'
  }
};

export const Closable: Story = {
  args: {
    ...defaultArgs,
    closable: true
  }
};

export const WithToaster: Story = {
  render: props => (
    <ButtonToolbar>
      <Button
        onClick={() => {
          toaster.push(
            <Notification {...props} type="success">
              This is a notification
            </Notification>
          );
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          toaster.push(
            <Notification {...props} type="error">
              This is a notification
            </Notification>
          );
        }}
      >
        Error
      </Button>
      <Button
        onClick={() => {
          toaster.push(
            <Notification {...props} type="warning">
              This is a notification
            </Notification>
          );
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          toaster.push(
            <Notification {...props} type="info">
              This is a notification
            </Notification>
          );
        }}
      >
        Info
      </Button>
    </ButtonToolbar>
  ),
  args: {
    ...defaultArgs,
    header: 'Title'
  }
};
