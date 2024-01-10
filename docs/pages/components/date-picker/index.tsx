import React from 'react';
import { DatePicker, Button, InputGroup, Input, Stack } from 'rsuite';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import isBefore from 'date-fns/isBefore';
import { FaCalendar, FaCalendarWeek, FaCalendarDay, FaCalendarCheck } from 'react-icons/fa';

import DefaultPage from '@/components/Page';

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        DatePicker,
        Button,
        InputGroup,
        Input,
        Stack,
        addDays,
        subDays,
        isBefore,
        FaCalendar,
        FaCalendarWeek,
        FaCalendarDay,
        FaCalendarCheck
      }}
      sandboxDependencies={{ 'date-fns': '^2.13.0' }}
    />
  );
}
