import React from 'react';
import { DatePicker, Button, InputGroup, Input, Stack, RadioGroup, Radio } from 'rsuite';
import { format, addDays, subDays, isBefore } from 'date-fns';
import {
  FaCalendar,
  FaCalendarWeek,
  FaCalendarDay,
  FaCalendarCheck,
  FaClock
} from 'react-icons/fa';
import { BsCalendar2MonthFill } from 'react-icons/bs';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['DatePicker']} />
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{
        DatePicker,
        Button,
        InputGroup,
        RadioGroup,
        Radio,
        Input,
        Stack,
        format,
        addDays,
        subDays,
        isBefore,
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
