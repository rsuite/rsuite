import React from 'react';
import DefaultPage from '@/components/Page';
import ImportGuide from '@/components/ImportGuide';
import Simulation from '@/components/Simulation';
import PlacementContainer from '@/components/PlacementContainer';
import {
  DatePicker,
  Button,
  InputGroup,
  Input,
  Stack,
  RadioGroup,
  Radio,
  Box,
  VStack,
  Text
} from 'rsuite';
import { format, addDays, subDays, isBefore } from 'date-fns';
import {
  FaCalendar,
  FaCalendarWeek,
  FaCalendarDay,
  FaCalendarCheck,
  FaClock
} from 'react-icons/fa';
import { BsCalendar2MonthFill } from 'react-icons/bs';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['DatePicker']} />,
  'example-responsive': () => <Simulation example="responsive" componentName="date-picker" />
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
        Box,
        VStack,
        Stack,
        Text,
        format,
        addDays,
        subDays,
        isBefore,
        FaCalendar,
        FaCalendarWeek,
        FaCalendarDay,
        FaCalendarCheck,
        FaClock,
        BsCalendar2MonthFill,
        PlacementContainer
      }}
      sandboxDependencies={{ 'date-fns': '^4.1.0' }}
    />
  );
}
