'use client';

import { DateRangePicker, Box } from 'rsuite';

const App = () => {
  return (
    <Box p={20}>
      <DateRangePicker block showOneCalendar />
    </Box>
  );
};

export default App;
