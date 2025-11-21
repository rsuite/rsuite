'use client';

import React from 'react';
import { TimePicker, Box } from 'rsuite';

const App = () => {
  return (
    <Box p={20}>
      <TimePicker block format="hh:mm aa" showMeridiem />
    </Box>
  );
};

export default App;
