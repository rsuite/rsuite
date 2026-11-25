'use client';

import { TimePicker, Box } from 'rsuite';

const App = () => {
  return (
    <Box p={20}>
      <TimePicker block format="hh:mm aa" showMeridiem />
    </Box>
  );
};

export default App;
