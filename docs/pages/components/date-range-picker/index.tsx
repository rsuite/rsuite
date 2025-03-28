import React from 'react';
import { DateRangePicker, Button, Divider, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';
import {
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  subDays,
  isAfter,
  addMonths,
  format
} from 'date-fns';
import { BsCalendar2MonthFill } from 'react-icons/bs';
import {
  FaCalendar,
  FaCalendarWeek,
  FaCalendarDay,
  FaCalendarCheck,
  FaClock
} from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['DateRangePicker']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="date-range-picker" />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        Stack,
        DateRangePicker,
        Button,
        Divider,
        format,
        addDays,
        subDays,
        isAfter,
        startOfWeek,
        endOfWeek,
        startOfMonth,
        endOfMonth,
        addMonths,
        FaCalendar,
        FaCalendarWeek,
        FaCalendarDay,
        FaCalendarCheck,
        FaClock,
        BsCalendar2MonthFill
      }}
      sandboxDependencies={{ 'date-fns': '^4.1.0' }}
    />
  );
}
