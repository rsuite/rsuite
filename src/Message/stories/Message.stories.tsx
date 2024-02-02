import React from 'react';
import type { StoryObj } from '@storybook/react';
import Message from '../Message';
import toaster from '../../toaster';
import Button from '../../Button';
import ButtonToolbar from '../../ButtonToolbar';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Button/styles/index.less';
import '../../toaster/styles/index.less';

const meta = createMeta(Message);

export default {
  title: 'Components/Message',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'This is a message'
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const SuccessMessage: Story = {
  args: {
    ...defaultArgs,
    type: 'success'
  }
};

export const ErrorMessage: Story = {
  args: {
    ...defaultArgs,
    type: 'error'
  }
};

export const WarningMessage: Story = {
  args: {
    ...defaultArgs,
    type: 'warning'
  }
};

export const ShowIcon: Story = {
  render: props => (
    <>
      <Message {...props} type="info" showIcon>
        This is a message
      </Message>
      <Message {...props} type="success" showIcon>
        This is a success message
      </Message>
      <Message {...props} type="error" showIcon>
        This is an error message
      </Message>
      <Message {...props} type="warning" showIcon>
        This is a warning message
      </Message>
    </>
  ),
  args: {
    ...defaultArgs,
    showIcon: true
  }
};

export const Header: Story = {
  args: {
    ...defaultArgs,
    showIcon: true,
    header: 'Header'
  }
};

export const Closable: Story = {
  args: {
    ...defaultArgs,
    closable: true
  }
};

export const Bordered: Story = {
  args: {
    ...defaultArgs,
    showIcon: true,
    bordered: true
  }
};

export const Centered: Story = {
  args: {
    ...defaultArgs,
    showIcon: true,
    centered: true,
    type: 'success',
    header: 'Application has been accepted !',
    children: (
      <>
        <p>
          Your application has been successfully submitted, and we will process it within 1-3
          working days.
        </p>
        <p>
          You can check the application status in the <a href="#">application record</a>.
        </p>
      </>
    )
  }
};

export const WithToaster: Story = {
  render: props => (
    <ButtonToolbar>
      <Button
        onClick={() => {
          toaster.push(
            <Message {...props} type="success">
              This is a message
            </Message>
          );
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          toaster.push(
            <Message {...props} type="error">
              This is a message
            </Message>
          );
        }}
      >
        Error
      </Button>
      <Button
        onClick={() => {
          toaster.push(
            <Message {...props} type="warning">
              This is a message
            </Message>
          );
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          toaster.push(
            <Message {...props} type="info">
              This is a message
            </Message>
          );
        }}
      >
        Info
      </Button>
    </ButtonToolbar>
  ),
  args: {
    ...defaultArgs
  }
};
