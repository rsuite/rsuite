import React from 'react';
import type { StoryObj } from '@storybook/react';
import HStack from '../../Stack/HStack';
import Stat, { StatProps } from '../Stat';
import PeoplesIcon from '@rsuite/icons/Peoples';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Stack/styles/index.less';

const meta = createMeta(Stat);

export default {
  ...meta,
  title: 'Components/Stat'
};

type Story = StoryObj<typeof meta>;

const defaultArgs: StatProps = {};

export const Default: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Stat.Label>Page Views</Stat.Label>
        <Stat.Value>4,394</Stat.Value>
        <Stat.HelpText>Last 7 Days</Stat.HelpText>
      </>
    )
  }
};

export const FormatOptions: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Stat.Label>Profits</Stat.Label>
        <Stat.Value
          value={38050}
          formatOptions={{
            style: 'currency',
            currency: 'USD'
          }}
        />
      </>
    )
  }
};

export const Trend: Story = {
  args: {
    ...defaultArgs,
    style: { width: 200 },
    children: (
      <>
        <Stat.Label>Profits</Stat.Label>
        <HStack>
          <Stat.Value>38,050</Stat.Value>
          <Stat.Trend>10%</Stat.Trend>
        </HStack>
      </>
    )
  }
};

export const Bordered: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    children: (
      <>
        <Stat.Label>Profits</Stat.Label>
        <Stat.Value>38,050</Stat.Value>
      </>
    )
  }
};

export const Icon: Story = {
  args: {
    ...defaultArgs,
    icon: <PeoplesIcon color="blue" style={{ fontSize: 30 }} />,
    bordered: true,
    style: { width: 200 },
    children: (
      <>
        <Stat.Label>Profits</Stat.Label>
        <Stat.Value>38,050</Stat.Value>
      </>
    )
  }
};

export const InfoTip: Story = {
  args: {
    ...defaultArgs,
    style: { margin: 50 },
    children: (
      <>
        <Stat.Label
          info="Page views is the total number of times the page has been viewed."
          uppercase
        >
          Page Views
        </Stat.Label>
        <Stat.Value>4,394</Stat.Value>
      </>
    )
  }
};

export const ValueUnit: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        <Stat.Label> Total Weight </Stat.Label>
        <Stat.Value>
          2,500 <Stat.ValueUnit>KG</Stat.ValueUnit>
        </Stat.Value>
      </>
    )
  }
};
