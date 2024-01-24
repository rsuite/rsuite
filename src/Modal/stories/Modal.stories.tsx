import React from 'react';
import type { StoryObj } from '@storybook/react';
import Modal from '../Modal';
import Button from '../../Button';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Button/styles/index.less';

const meta = createMeta(Modal);

export default {
  title: 'Components/Modal',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  open: true,
  children: (
    <>
      <Modal.Header>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>Body</Modal.Body>
      <Modal.Footer>
        <Button appearance="primary">Ok</Button>
        <Button appearance="subtle">Cancel</Button>
      </Modal.Footer>
    </>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Size: Story = {
  args: {
    ...defaultArgs,
    size: '50%'
  }
};

export const Fullscreen: Story = {
  args: {
    ...defaultArgs,
    size: 'full'
  }
};

export const BackdropHidden: Story = {
  args: {
    ...defaultArgs,
    backdrop: false
  }
};

export const BackdropStatic: Story = {
  args: {
    ...defaultArgs,
    backdrop: 'static'
  }
};
