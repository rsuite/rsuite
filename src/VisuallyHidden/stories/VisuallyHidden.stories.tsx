import React from 'react';
import type { StoryObj } from '@storybook/react';
import CreativeIcon from '@rsuite/icons/Creative';
import VisuallyHidden from '../';
import Button from '../../Button';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Button/styles/index.less';

const meta = createMeta(VisuallyHidden);

export default {
  title: 'Components/VisuallyHidden',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {};

export const Default: Story = {
  render: props => (
    <Button>
      <VisuallyHidden {...props}>Creative</VisuallyHidden>
      <CreativeIcon />
    </Button>
  ),
  args: {
    ...defaultArgs
  }
};
