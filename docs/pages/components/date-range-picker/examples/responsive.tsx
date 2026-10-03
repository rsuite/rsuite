'use client';

import React from 'react';
import { DateRangePicker, SelectPicker, Stack, Box } from 'rsuite';

const breakpoints = [
  { label: 'Below 576px (default)', value: 'default' },
  { label: 'Below 992px (mdDown)', value: 'mdDown' },
  { label: 'Up to 1279px (custom query)', value: '(max-width: 1279px)' },
  { label: 'Always use a positioned popup', value: 'disabled' }
];

const App = () => {
  const [breakpoint, setBreakpoint] = React.useState('default');
  const responsive =
    breakpoint === 'default' ? true : breakpoint === 'disabled' ? false : breakpoint;

  return (
    <Box p={20}>
      <Stack direction="column" align="stretch" spacing={16}>
        <SelectPicker
          aria-label="Drawer breakpoint"
          data={breakpoints}
          value={breakpoint}
          onChange={value => setBreakpoint(value ?? 'default')}
          searchable={false}
          cleanable={false}
          responsive={false}
          block
        />
        <DateRangePicker responsive={responsive} block showOneCalendar />
      </Stack>
    </Box>
  );
};

export default App;
