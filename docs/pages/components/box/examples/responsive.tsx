'use client';

import React from 'react';
import { Box, Text } from 'rsuite';

const App = () => {
  return (
    <>
      <Box bg="green.600" p={20} h={200} hideFrom="xs">
        <Text color="white">The component will be hidden at breakpoints larger than `xs`</Text>
      </Box>

      <Box bg="blue.600" p={20} h={200} showFrom="xs">
        <Text color="white">The component will be visible only at the `xs` breakpoint</Text>
      </Box>
    </>
  );
};

export default App;
