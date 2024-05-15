import React from 'react';
import { DateRangePicker, Button, Divider, Stack } from 'rsuite';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import subDays from 'date-fns/subDays';
import isAfter from 'date-fns/isAfter';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import { BsCalendar2MonthFill } from 'react-icons/bs';
import {
  FaCalendar,
  FaCalendarWeek,
  FaCalendarDay,
  FaCalendarCheck,
  FaClock
} from 'react-icons/fa';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['DateRangePicker']} />
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
      sandboxDependencies={{ 'date-fns': '^2.13.0' }}
    />
  );
}
