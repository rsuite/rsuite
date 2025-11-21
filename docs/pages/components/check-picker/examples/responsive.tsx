'use client';

import React from 'react';
import { CheckPicker, Box } from 'rsuite';

const data = [
  'Eugenia',
  'Bryan',
  'Linda',
  'Nancy',
  'Lloyd',
  'Alice',
  'Julia',
  'Albert',
  'Samantha',
  'Oliver',
  'Emily',
  'Daniel',
  'Sophia',
  'Michael'
].map(item => ({ label: item, value: item }));

const App = () => {
  return (
    <Box p={20}>
      <CheckPicker data={data} block />
    </Box>
  );
};

export default App;
