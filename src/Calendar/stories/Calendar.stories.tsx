import React from 'react';
import type { StoryObj } from '@storybook/react';
import Calendar from '../Calendar';
import Badge from '../../Badge';
import { createMeta } from '@/storybook/utils';
import '../styles/index.scss';
import '../../Badge/styles/index.scss';

const meta = createMeta(Calendar);

export default {
  title: 'Components/Calendar',
  ...meta
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const Bordered: Story = {
  args: {
    ...defaultArgs,
    bordered: true
  }
};

export const Compact: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    compact: true,
    style: {
      width: 300
    }
  }
};

export const CustomCell: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    renderCell: (date: Date) => {
      const day = date.getDate();
      if (day % 5 === 0) {
        return (
          <div>
            {day}
            <Badge content="Event" style={{ marginLeft: 4 }} />
          </div>
        );
      }
      return day;
    }
  }
};

export const ISOWeek: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    isoWeek: true
  }
};

export const WeekStartMonday: Story = {
  args: {
    ...defaultArgs,
    bordered: true,
    weekStart: 1
  }
};
