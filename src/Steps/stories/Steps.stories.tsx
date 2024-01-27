import React from 'react';
import type { StoryObj } from '@storybook/react';
import Steps, { StepsProps } from '../Steps';
import PencilSquareIcon from '@rsuite/icons/legacy/PencilSquare';
import BookIcon from '@rsuite/icons/legacy/Book';
import WechatIcon from '@rsuite/icons/Wechat';
import SteamSquareIcon from '@rsuite/icons/legacy/SteamSquare';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Divider/styles/index.less';
import '../../Button/styles/index.less';

const meta = createMeta(Steps);

export default {
  ...meta,
  title: 'Components/Steps'
};

type Story = StoryObj<typeof meta>;

const defaultArgs: StepsProps = {
  current: 1,
  children: (
    <>
      <Steps.Item />
      <Steps.Item />
      <Steps.Item />
      <Steps.Item />
    </>
  )
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Title: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Steps.Item title="Finished" />
        <Steps.Item title="In Progress" />
        <Steps.Item title="Waiting" />
        <Steps.Item title="Waiting" />
      </>
    )
  }
};

export const Description: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Steps.Item title="Finished" description="This is a description." />
        <Steps.Item title="In Progress" description="This is a description." />
        <Steps.Item title="Waiting" description="This is a description." />
        <Steps.Item title="Waiting" description="This is a description." />
      </>
    )
  }
};

export const Vertical: Story = {
  args: {
    ...defaultArgs,
    vertical: true,
    children: (
      <>
        <Steps.Item title="Finished" description="This is a description." />
        <Steps.Item title="In Progress" description="This is a description." />
        <Steps.Item title="Waiting" description="This is a description." />
        <Steps.Item title="Waiting" description="This is a description." />
      </>
    )
  }
};

export const Small: Story = {
  args: {
    ...defaultArgs,
    small: true,
    children: (
      <>
        <Steps.Item title="Finished" description="This is a description." />
        <Steps.Item title="In Progress" description="This is a description." />
        <Steps.Item title="Waiting" description="This is a description." />
        <Steps.Item title="Waiting" description="This is a description." />
      </>
    )
  }
};

export const ErrorStatus: Story = {
  args: {
    ...defaultArgs,
    currentStatus: 'error',
    children: (
      <>
        <Steps.Item title="Finished" description="This is a description." />
        <Steps.Item title="In Progress" description="This is a description." />
        <Steps.Item title="Waiting" description="This is a description." />
        <Steps.Item title="Waiting" description="This is a description." />
      </>
    )
  }
};

export const CustomIcon: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Steps.Item title="Finished" icon={<PencilSquareIcon />} />
        <Steps.Item title="In Progress" icon={<BookIcon />} />
        <Steps.Item title="Waiting" icon={<WechatIcon />} />
        <Steps.Item title="Waiting" icon={<SteamSquareIcon />} />
      </>
    )
  }
};
