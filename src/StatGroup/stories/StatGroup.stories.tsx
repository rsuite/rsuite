import React from 'react';
import type { StoryObj } from '@storybook/react';
import HStack from '../../Stack/HStack';
import Stat from '../../Stat';
import StatGroup, { StatGroupProps } from '../StatGroup';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';
import '../../Stat/styles/index.less';
import '../../Stack/styles/index.less';

const meta = createMeta(StatGroup);

export default {
  ...meta,
  title: 'Components/StatGroup'
};

type Story = StoryObj<typeof meta>;

const defaultArgs: StatGroupProps = {
  children: (
    <>
      <Stat bordered>
        <Stat.Label>Profits</Stat.Label>
        <HStack>
          <Stat.Value>38,050</Stat.Value>
          <Stat.Trend>10%</Stat.Trend>
        </HStack>
      </Stat>

      <Stat bordered>
        <Stat.Label>Revenue</Stat.Label>
        <HStack>
          <Stat.Value>4,635</Stat.Value>
          <Stat.Trend indicator="down">5%</Stat.Trend>
        </HStack>
      </Stat>

      <Stat bordered>
        <Stat.Label>Cost</Stat.Label>
        <HStack>
          <Stat.Value>2,800</Stat.Value>
          <Stat.Trend>10%</Stat.Trend>
        </HStack>
      </Stat>

      <Stat bordered>
        <Stat.Label> Expenses</Stat.Label>
        <HStack>
          <Stat.Value>1,130</Stat.Value>
          <Stat.Trend>3%</Stat.Trend>
        </HStack>
      </Stat>
    </>
  )
};

export const Columns: Story = {
  args: {
    ...defaultArgs,
    columns: 2
  }
};

export const Spacing: Story = {
  args: {
    ...defaultArgs,
    spacing: 20
  }
};
