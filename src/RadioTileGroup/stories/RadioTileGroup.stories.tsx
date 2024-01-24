import React from 'react';
import type { StoryObj } from '@storybook/react';
import RadioTileGroup from '../RadioTileGroup';
import RadioTile from '../../RadioTile';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import AppSelectIcon from '@rsuite/icons/AppSelect';
import CreativeIcon from '@rsuite/icons/Creative';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../RadioTile/styles/index.less';

const meta = createMeta(RadioTileGroup);

export default {
  title: 'Components/RadioTileGroup',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <RadioTile icon={<AppSelectIcon />} label="Private" value="private">
        Project access must be granted explicitly to each user. If this project is part of a group,
        access will be granted to members of the group.
      </RadioTile>
      <RadioTile icon={<AddOutlineIcon />} label="Internal" value="internal">
        The project can be accessed by any logged in user except external users.
      </RadioTile>

      <RadioTile icon={<CreativeIcon />} label="Public" value="public">
        The project can be accessed without any authentication.
      </RadioTile>
    </>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Inline: Story = {
  args: {
    ...defaultArgs,
    inline: true
  }
};
